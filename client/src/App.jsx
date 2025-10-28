import React, { useCallback, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import axios from "axios";
import Searchbar from './components/searchbar/searchbar';
import GameCard from './components/gameCard/gameCard';
import './assets/pat.scss';
import useOnScreen from "./hooks/useOnScreen";
import $ from 'jquery';

function App() {
    const [query, setQuery] = useState("");
    let [filters, setFilters] = useState({sort_by:"featured", sort_dir:"", "game_category":[],"sales":[], "format":"all", "console":"all","availability":[],"price_range":"all"});
    let [currentPage, setCurrentPage] = useState(1);
    const [resGames, setResGames] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const { measureRef, isIntersecting, observer } = useOnScreen();

    useEffect(() => {
        if (isIntersecting && hasMore) {
            let nextPage = parseInt(currentPage) + 1;
            setCurrentPage(nextPage);
            observer.disconnect();
        }

        // this should only be for scrolling down...
        // if they change a filter or search term, default back to page 1...
    }, [isIntersecting, hasMore]);

    useEffect(() => {
        executeSearch();
    }, [query, filters, currentPage]);

    useEffect(() => {
        setTimeout(() => {
            let el = $(".ndo-video");

            if(el.length > 0) {
                $(".ndo-video").each(function(index, el) {
                    el.pause();
                    el.currentTime = 0;
                });
            }

        }, 1000 )

    }, [resGames]);

    async function executeSearch() {
        console.log("execute search...", {query:query, currentPage:currentPage, filters:filters});

        try {
            const response = await axios("http://localhost:8080/nintendo/all?q=" + query + "&current_page=" + currentPage + "&filters=" + JSON.stringify(filters));
            //console.log(response.data);
            if(currentPage == 1) {
                setResGames([].concat(response.data.games));
            } else {
                setResGames(resGames.concat(response.data.games));
            }

            setHasMore(response.data.hasMore);
        } catch (error) {
            console.error("Error fetching data:", error);
            setHasMore(false);
        }
    }

    function dataFromSearchBar(data) {
        //console.log("data from searchbar", data);
        setQuery(data.query);
        setFilters(data.filters);
        setCurrentPage(1);
    }

    //const imageUrl = 'https://place-hold.it/500x500/666'; // Replace with your remote image URL

    return (
        <>
            <div className="" style={{ position:"fixed", top:"0", left:"0", width:"100vw", zIndex:"100", padding:"20px", backgroundColor:"#d3d3d3" }}>
                <Searchbar sendToParent={dataFromSearchBar} query={query} filters={filters}></Searchbar>
            </div>
            <div className="col-lg-10 offset-lg-1 hide-scroll" id="scroll-container" style={{ margin:"100px auto", minHeight: '100vh', overflowY: 'scroll' }}>
                { resGames.map((resGame, index) => {
                    if (index === resGames.length - 1) {
                        return (
                            <GameCard mesureRef={measureRef} index={index} game={resGame}/>
                        );
                    }
                    return <GameCard key={index} game={resGame}/>
                })}
            </div>
        </>
    );
}

export default App;