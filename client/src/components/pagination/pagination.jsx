import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import axios from "axios";

function pagination(props) {
    const [currentPage, setCurrentPage] = useState(1);
    const arr = [];

    useEffect(() => {
        props.sendToParent(currentPage);
    }, [currentPage]);

    function changePage(num) {
        setCurrentPage(num);
    }

    for (let i = 1; i <= props.lastPage; i++) {
        arr.push(<Pagination.Item key={i} onClick={() => changePage(i)} active={i === currentPage}>{i}</Pagination.Item>);
    }

    return (
        <>
        <Pagination>
            <Pagination.First onClick={() => changePage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1} />
            {arr}
            <Pagination.Next onClick={() => changePage(currentPage + 1)} disabled={currentPage === props.lastPage} />
            <Pagination.Last onClick={() => changePage(props.lastPage)} disabled={currentPage === props.lastPage} />
        </Pagination>
        </>
    );
}

export default pagination;