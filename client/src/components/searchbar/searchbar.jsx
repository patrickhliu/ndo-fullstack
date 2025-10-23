import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import Sortbar from "../../components/sortbar/sortbar";
//
function searchbar(props) {
    const [query, setQuery] = useState(props.query);
    const [filters, setFilters] = useState(props.filters);

    useEffect(() => {
        props.sendToParent({query:query, filters:filters});
    }, [filters]);

    const search = () => {
        props.sendToParent({query:query, filters:filters});
    }

    function dataFromSortBar(data) {
        setFilters(data);
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