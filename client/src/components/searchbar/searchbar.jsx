import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";
import Sortbar from "../../components/sortbar/sortbar";
//
function searchbar(props) {
    const currentPage = props.currentPage
    const [query, setQuery] = useState("");
    const [pageData, setPageData] = useState([]);
    const [filters, setFilters] = useState({sort_by:"featured", sort_dir:"", "game_category":[],"sales":[], "format":"all", "console":"all","availability":[],"price_range":"all"});

    useEffect(() => {}, [pageData]);

    useEffect(() => {
        //console.log('update-filter', filters);
        search();
    }, [currentPage, filters]);

    const search = async () => {
        try {
            const response = await axios("http://localhost:8080/nintendo/all?q=" + query + "&current_page=" + currentPage + "&filters=" + JSON.stringify(filters));
            setPageData(response.data.results);
            props.sendToParent(response.data);
            //props.sendToParent({results:[], count:{}, total_pages:0});
        } catch (err) {
            console.error("Error fetching data:", err);
            //setData([]);
        } finally {
            //setLoading(false);
        }
    };

    function dataFromSortBar(data) {
        setFilters(data);
        //console.log("dataFromSortBar", filters);
    }

    return (
        <>
        <Row>
            <Col>
                <InputGroup>
                    <Form.Control placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query}/>
                    <Button variant="" className="bg-steel-blue" onClick={search}>Search</Button>
                </InputGroup>
            </Col>
            <Col>
                <Sortbar sendToParent={dataFromSortBar} filters={filters} gameCategoryCount={props.gameCategoryCount}></Sortbar>
            </Col>
        </Row>
        </>
    );
}

export default searchbar;