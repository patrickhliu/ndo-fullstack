import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import Searchbar from './components/searchbar/searchbar';
import Pagination from './components/pagination/pagination';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';

function App() {
    const [currentTab, setCurrentTab] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [apiResponse, setApiResponse] = useState({results:[], count:{}, total_pages:0});

    useEffect(() => {
        //console.log('total pages updated', totalPages);
    }, [currentPage]);

    function dataFromSearchBar(data) {
        console.log('dataFromSearchBar', data);
        //setTotalPages(data.total_pages);
        setApiResponse(data);
    }

    function dataFromPagination(data) {
        setCurrentPage(data);
        //console.log('dataFromPagination', data);
    }

    function dataFromNavBar(data) {
        setCurrentTab(data);
        console.log('dataFromNavBar', data);
    }

    const imageUrl = 'https://place-hold.it/500x500/666'; // Replace with your remote image URL

    return (
        <>
            <div className="my-3 ms-3">
                <Searchbar sendToParent={dataFromSearchBar} currentPage={currentPage} gameCategoryCount={apiResponse.count}></Searchbar>
            </div>
            <Navbar sendToParent={dataFromNavBar} currentTab={currentTab}></Navbar>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                { currentTab == 1 &&  apiResponse.results.length > 0 && apiResponse.results.map((obj, i) =>
                <Card key={i} style={{ width:'15%' }} className="mt-5">
                    { obj.photo_url && <Card.Img className="mt-3 card-img-sq" variant="top" src={obj.photo_url} /> }
                    { !obj.photo_url && <Card.Img className="mt-3 card-img-sq" variant="top" src="https://place-hold.it/500x500?text=%22No%20Image%22&fontsize=48" /> }
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>
                            <b style={{ fontSize: '16px', }}>{obj.title}</b>
                            <br/>
                            { obj.platform_code == "NINTENDO_SWITCH" && <Badge className="mt-2" bg="danger"><span className="font-14">Switch</span></Badge> }
                            { obj.platform_code == "NINTENDO_SWITCH_2" && <Badge className="mt-2 bg-cherry-inv" bg=""><span className="font-14">Switch <i className="fa-solid fa-2"></i></span></Badge> }
                            <p className="mt-2 font-14">
                                { obj.release_future && <span><i>Available {obj.release_date} ({obj.release_future_days} Days)</i></span> }
                                { !obj.release_future && <span>Released {obj.release_date}</span> }
                            </p>
                            <hr/>
                            { !obj.current_price && <span className="font-16">${obj.regular_price}</span>}
                            { obj.current_price && <span className="font-16"style={{ textDecoration: 'line-through', }}>${obj.regular_price}</span>}
                            { obj.current_price && <Badge bg="" className="font-16 bg-forest-green ms-2">${obj.current_price}</Badge>}
                            { obj.current_price && <Badge bg="" className="font-16 bg-khaki ms-2"><i className="fa-solid fa-arrow-trend-down"></i> - {obj.discount_percent}%</Badge>}
                            <br/>
                            {/* { obj.availability.includes("Pre-order") && <Badge bg="" className="bg-steel-blue mt-3"><span className="font-14">Pre-order</span></Badge> } */}
                        </Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary" className="mt-auto">Go somewhere</Button>
                    </Card.Body>
                </Card>
            )}
            </div>
            <Pagination sendToParent={dataFromPagination} lastPage={apiResponse.total_pages}></Pagination>
        </>
    );
}

export default App;