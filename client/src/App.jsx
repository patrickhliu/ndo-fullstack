import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/navbar';
import Searchbar from './components/searchbar/searchbar';
import Pagination from './components/pagination/pagination';
import PhotoGallery from './components/photoGallery/photoGallery';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import './assets/pat.scss';


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
            <div class="col-lg-8 offset-lg-2">
                { currentTab == 1 &&  apiResponse.results.length > 0 && apiResponse.results.map((obj, i) =>
                    <Card key={i} style={{  }} className="mt-3">
                        <Card.Title className="bg-cherry m-0 p-0 py-2" style={{ margin:0 }}>
                            <p className="m-0 p-0 py-2 ms-3 d-inline-block" style={{ width:"max-content" }}><b>{obj.title}</b></p>
                            <p className="float-end m-0 p-0 py-2"><i className="fa-regular fa-heart me-3"></i></p>
                            <p className="float-end m-0 p-0 py-2"><i className="fa-regular fa-star me-3"></i></p>
                        </Card.Title>
                        <Card.Body className="row">
                            { obj.photo_url && <Card.Img className="card-img-sq" variant="top" src={obj.photo_url} /> }
                            <div className="col-lg-8" style={{ border:"1px solid green"}}>
                                { obj.platform_code == "NINTENDO_SWITCH"   && <Badge className="font-18" bg="cherry-br">Switch</Badge> }
                                { obj.platform_code == "NINTENDO_SWITCH_2" && <Badge className="font-18" bg="cherry-inv-br">Switch <i className="fa-solid fa-2"></i></Badge> }

                                { !obj.release_future && <Badge className="font-18 mt-3 ms-3 d-inline-block" bg="black-br"><i class="fa-regular fa-calendar-days me-2"></i>{obj.release_date}</Badge> }
                                { obj.release_future && <Badge className="font-18 mt-3 ms-3 d-inline-block" bg="black-br"><i class="fa-solid fa-hourglass-start me-2"></i>{obj.release_date} (In {obj.release_future_days} Days)</Badge> }
                                { obj.availability.includes("Pre-order") && <Badge className="font-18 mt-3 ms-3 d-inline-block" bg="black-br">Pre-Order</Badge> }
                                { obj.availability.includes("New releases") && <Badge className="font-18 mt-3 ms-3 d-inline-block" bg="black-br">New Release</Badge> }
                                { obj.photo_gallery.length > 0 && <Badge className="font-18 mt-3 ms-3 d-inline-block" bg="black-br">Photos</Badge> }
                                <br/>
                                { !obj.sale_price && obj.regular_price && <Badge className="font-18 mt-3 me-4 d-inline-block" bg="black-br"><i class="fa-solid fa-tag me-2"></i>${obj.regular_price}</Badge> }
                                { obj.sale_price && obj.regular_price && <Badge className="font-18 mt-3 me-4 d-inline-block" bg="khaki-br"><i class="fa-solid fa-tag me-2"></i>
                                    <span style={{ textDecoration: 'line-through' }}>${obj.regular_price}</span>
                                    <span className="ms-3">${obj.sale_price}</span>
                                    <i class="fa-regular fa-circle-down ms-3"></i><span>{obj.discount_percent}%</span>
                                    <span className="ms-3"><i>Discount Ends In {obj.discount_ends} Days</i></span>
                                </Badge> }
                                <br/>
                                { obj.is_digital && obj.file_size && <Badge className="font-18 mt-3 me-4 d-inline-block" bg="black-br"><i class="fa-solid fa-cloud-arrow-down me-2"></i>Digital - {obj.file_size}</Badge> }
                                { obj.is_digital && !obj.file_size && <Badge className="font-18 mt-3 me-4 d-inline-block" bg="black-br"><i class="fa-solid fa-cloud-arrow-down me-2"></i>Digital</Badge> }
                                { obj.is_physical && <Badge className="font-18 mt-3 me-4 d-inline-block" bg="black-br"><i class="fa-solid fa-box-archive me-2"></i>Physical</Badge> }
                                <br/>
                                { obj.software_publisher && <Badge className="font-16 mt-3 me-4 d-inline-block" bg="black-br">Published By {obj.software_publisher}</Badge> }
                                <br/>
                                { obj.software_developer && <Badge className="font-16 mt-3 me-4 d-inline-block" bg="black-br">Developed By {obj.software_developer}</Badge> }
                            </div>
                        </Card.Body>
                        <PhotoGallery photos={obj.photo_gallery}></PhotoGallery>
                    </Card>
                )}
            </div>
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
                            { obj.platform_code == "NINTENDO_SWITCH_2" && <Badge className="mt-2" bg="cherry-inv"><span className="font-14">Switch <i className="fa-solid fa-2"></i></span></Badge> }
                            <p className="mt-2 font-14">
                                { obj.release_future && <span><i>Available {obj.release_date} ({obj.release_future_days} Days)</i></span> }
                                { !obj.release_future && <span>Released {obj.release_date}</span> }
                            </p>
                            <hr/>
                            { !obj.sale_price && !obj.regular_price && <span className="font-16">FREE</span> }
                            { !obj.sale_price && obj.regular_price && <span className="font-16">${obj.regular_price}</span> }
                            { obj.sale_price && obj.regular_price && <span className="font-16" style={{ textDecoration: 'line-through', }}>${obj.regular_price}</span> }
                            { obj.sale_price && <Badge bg="" className="font-16 bg-forest-green ms-2">${obj.sale_price}</Badge>}
                            { obj.sale_price && <Badge bg="" className="font-16 bg-khaki ms-2"><i className="fa-solid fa-arrow-trend-down"></i> - {obj.discount_percent}%</Badge>}
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