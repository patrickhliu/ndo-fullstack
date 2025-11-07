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
    let [filters, setFilters] = useState({sort_by:"", sort_dir:"", game_category:[], sales:false, demo:false, format:"", console:"", availability:[], price_range:0});
    let [currentPage, setCurrentPage] = useState(1);
    const [resGames, setResGames] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(false);
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
        //setTimeout(() => {
            let vids = $(".ndo-video");

            vids.trigger("pause");
            //vids.prop('muted', true);

            if(vids.length > 0) {
                $(".ndo-video").each(function(index, el) {
                    el.currentTime = 0;
                });
            }

        //}, 250 )

    }, [resGames]);

    async function executeSearch() {
        //console.log("execute search...", {query:query, currentPage:currentPage, filters:filters});
        setLoading(true);

        try {
            const response = await axios("/nintendo/all?q=" + query + "&current_page=" + currentPage + "&filters=" + JSON.stringify(filters));
            //console.log(response.data);
            setLoading(false);

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
            <div className="text-center" style={{ position:"fixed", top:"0", left:"0", width:"100vw", zIndex:"100", padding:"20px", backgroundColor:"#36454F" }}>
                <p className="m-0 p-0 mb-3" style={{ color:"#fff" }}><b>eShop Scraper Project</b></p>
                <Searchbar sendToParent={dataFromSearchBar} query={query} filters={filters}></Searchbar>
            </div>
            { loading &&
            <div className="spinner-container">
                    <div className="spinner">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                    </div>

            }
            { !loading && <div className="hide-scroll flex-center col-lg-10 offset-lg-1" style={{ margin:"100px auto", minHeight: "100vh", overflowY: "scroll" }}>
                { resGames.map((resGame, index) => {
                    /* return <div>{resGame.title}</div> */
                    if (index === resGames.length - 1) {
                        return (
                            <GameCard mesureRef={measureRef} index={index} game={resGame}/>
                        );
                    }
                    return <GameCard key={index} game={resGame}/>
                })}
            </div> }
        </>
    );
}

export default App;