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

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            console.log('Enter key pressed! Input value:');
            search();
            // Perform desired action, e.g., submit a form, send a message
        }
    };

    function dataFromSortBar(data) {
        setFilters(data);
    }

    return (
        <>
        <Row>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col xs={4}>
                <InputGroup>
                    <Form.Control placeholder="Search..." onChange={(e) => setQuery(e.target.value)} value={query} onKeyPress={handleKeyPress}/>
                    <Button className="bg-steel-blue" onClick={search}><b>Search</b></Button>
                </InputGroup>
            </Col>
            <Col xs={2}>
                <Sortbar sendToParent={dataFromSortBar} filters={filters} gameCategoryCount={props.gameCategoryCount}></Sortbar>
            </Col>
            <Col></Col>
            <Col></Col>
        </Row>
        </>
    );
}

export default searchbar;