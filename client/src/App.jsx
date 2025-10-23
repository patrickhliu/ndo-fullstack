import React, { useCallback, useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import axios from "axios";
import Searchbar from './components/searchbar/searchbar';
import GameCard from './components/gameCard/gameCard';
import './assets/pat.scss';
import useOnScreen from "./hooks/useOnScreen";

function App() {
    const [query, setQuery] = useState("");
    const [filters, setFilters] = useState({sort_by:"featured", sort_dir:"", "game_category":[],"sales":[], "format":"all", "console":"all","availability":[],"price_range":"all"});
    let [currentPage, setCurrentPage] = useState(1);

    const [apiResponse, setApiResponse] = useState({games:[], count:{}, total_pages:1});
    const [resGames, setResGames] = useState([]);
    //const [resGames, setResGames] = useState([]);
    //const [resGames, setResGames] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const { measureRef, isIntersecting, observer } = useOnScreen();

    useEffect(() => {
        if (isIntersecting && hasMore) {
            setCurrentPage(currentPage => currentPage + 1);
            console.log("load more..." + currentPage);
            executeSearch();
            observer.disconnect();
        }
    }, [isIntersecting, hasMore]);

    useEffect(() => {

    }, [currentPage]);

    useEffect(() => {
        setResGames(resGames.concat(apiResponse.games));
    }, [apiResponse]);

    async function executeSearch() {
        //console.log("execute search...", {query:query, currentPage:currentPage, filters:filters});

        try {
            const response = await axios("http://localhost:8080/nintendo/all?q=" + query + "&current_page=" + currentPage + "&filters=" + JSON.stringify(filters));
            //console.log(response.data);
            setApiResponse(response.data);
            setHasMore(true);
            /* if (response.data.length === 0) {
                setHasMore(false);
            } */
        } catch (error) {
            console.error("Error fetching data:", error);
            setHasMore(false);
        }
    }

    function dataFromSearchBar(data) {
        //console.log("data from searchbar", data);
        executeSearch();
    }

    //const imageUrl = 'https://place-hold.it/500x500/666'; // Replace with your remote image URL

    return (
        <>
            <h3>What is wrong with Video???</h3>
            <div className="my-3 ms-2">
                <Searchbar sendToParent={dataFromSearchBar} query={query} filters={filters}></Searchbar>
            </div>
            <div className="col-lg-10 offset-lg-1 hide-scroll" id="scroll-container" style={{ minHeight: '100vh', overflowY: 'scroll', border: '1px solid black' }}>
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