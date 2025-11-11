import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";

function ebayModal() {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("switch2");
    const [apiResponse, setApiResponse] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
    }

    async function executeEbaySearch() {
        //console.log("execute search...", {query:query, currentPage:currentPage, filters:filters});
        setLoading(true);

        try {
            let response = await axios("/ebay/search?q=" + query);
            console.log(response.data);
            setLoading(false);


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        executeEbaySearch();
    }, [query]);

  return (
    <>
    <Badge className="font-14 me-2 py-2 px-2 pointer" bg="primary" style={{ border:"none" }} onClick={handleShow}>
            eBay
    </Badge>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Woohoo, you are reading this text in a modal!
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
        </Modal.Footer>
    </Modal>
    </>
  );
}

export default ebayModal;