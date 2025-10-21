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
            <div className="my-3 ms-2">
                <Searchbar sendToParent={dataFromSearchBar} currentPage={currentPage} gameCategoryCount={apiResponse.count}></Searchbar>
            </div>
            <Navbar sendToParent={dataFromNavBar} currentTab={currentTab}></Navbar>
            <div class="col-lg-10 offset-lg-1">
                { currentTab == 1 &&  apiResponse.results.length > 0 && apiResponse.results.map((obj, i) =>
                    <Card key={i} className={ i%3 == 0 ? "col-lg-3 my-3 d-inline-block" : "col-lg-3 offset-lg-1 my-3 d-inline-block"}>
                        <Card.Title className="bg-cherry m-0 p-0 py-2" style={{ margin:0 }}>
                            <p className="m-0 p-0 py-2 ms-2 d-inline-block font-14" style={{ width:"max-content" }}><b>{obj.title}</b></p>
                        </Card.Title>
                        <Card.Body>
                            { obj.photo_gallery.length == 1 && <img src={obj.photo_gallery[0].src} className="w-100" /> }
                            { obj.photo_gallery.length > 1 && <PhotoGallery photos={obj.photo_gallery}></PhotoGallery> }
                            <div style={{ border:"1px solid green"}}>
                                 {/* <p className="float-end m-0 p-0 py-2"><i className="fa-regular fa-heart me-3"></i></p> */}
                                 <p className="float-end m-0 p-0 py-2"><i class="fa-regular fa-note-sticky me-3"></i></p>
                                { obj.platform_code == "NINTENDO_SWITCH"   && <Badge className="font-12 float-end mt-2 me-3" bg="cherry-br">Switch</Badge> }
                                { obj.platform_code == "NINTENDO_SWITCH_2" && <Badge className="font-12 float-end mt-2 me-3" bg="cherry-inv-br">Switch <i className="fa-solid fa-2"></i></Badge> }
                                {/* { obj.availability.includes("Pre-order") && <Badge className="font-12 mt-2 ms-2 d-inline-block" bg="black-br">Pre-Order</Badge> } */}
                                {/* { obj.availability.includes("New releases") && <Badge className="font-12 mt-2 ms-2 d-inline-block" bg="black-br">New Release</Badge> } */}
                                {/* { obj.photo_gallery.length > 0 && <Badge className="font-12 mt-2 ms-2 d-inline-block" bg="black-br">Photos</Badge> } */}
                                { !obj.sale_price && obj.regular_price && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">${obj.regular_price}</Badge> }
                                { obj.sale_price && obj.regular_price && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="khaki-br">
                                    <span style={{ textDecoration: 'line-through' }}>${obj.regular_price}</span>
                                    <span className="ms-2">${obj.sale_price}</span>
                                    <i class="fa-regular fa-circle-down ms-2"></i><span>{obj.discount_percent}%</span>
                                    <span className="ms-2">(Expires {obj.discount_ends} Days)</span>
                                </Badge> }
                                <br/>
                                { obj.is_digital && obj.file_size && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Digital - {obj.file_size}</Badge> }
                                { obj.is_digital && !obj.file_size && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Digital</Badge> }
                                { obj.is_physical && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br"><i class="fa-solid fa-box-archive me-2"></i>Physical</Badge> }
                                <br/>
                                { !obj.release_future && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Released - {obj.release_date}</Badge> }
                                { obj.release_future && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Available - {obj.release_date} (In {obj.release_future_days} Days)</Badge> }
                                { obj.software_publisher && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Publisher - {obj.software_publisher}</Badge> }
                                {/* { obj.software_developer && <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br">Developed By {obj.software_developer}</Badge> } */}
                                <br/>
                                <Badge className="font-12 mt-2 me-2 d-inline-block" bg="black-br"><a target="_blank" href={"https://www.nintendo.com/" + obj.url} style={{ textDecoration:"none"}}>Nintendo eShop</a></Badge>
                            </div>
                        </Card.Body>
                        <div class="card-footer">
                            YouTube Here...
                            Infinite Scroll?
                        </div>
                    </Card>
                )}
            </div>
            { false &&
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                { currentTab == 1 &&  apiResponse.results.length > 0 && apiResponse.results.map((obj, i) =>
                <Card key={i} style={{ width:'15%' }} className="mt-5">
                    { obj.photo_url && <Card.Img className="mt-2 card-img-sq" variant="top" src={obj.photo_url} /> }
                    { !obj.photo_url && <Card.Img className="mt-2 card-img-sq" variant="top" src="https://place-hold.it/500x500?text=%22No%20Image%22&fontsize=48" /> }
                    <Card.Body className="d-flex flex-column">
                        <Card.Title>
                            <b className="font-14">{obj.title}</b>
                            <br/>
                            { obj.platform_code == "NINTENDO_SWITCH" && <Badge className="mt-4" bg="danger"><span className="font-12">Switch</span></Badge> }
                            { obj.platform_code == "NINTENDO_SWITCH_2" && <Badge className="mt-4" bg="cherry-inv"><span className="font-12">Switch <i className="fa-solid fa-2"></i></span></Badge> }
                            <p className="mt-2 font-12">
                                { obj.release_future && <span><i>Available {obj.release_date} ({obj.release_future_days} Days)</i></span> }
                                { !obj.release_future && <span>Released {obj.release_date}</span> }
                            </p>
                            <hr/>
                            { !obj.sale_price && !obj.regular_price && <span className="font-12">FREE</span> }
                            { !obj.sale_price && obj.regular_price && <span className="font-12">${obj.regular_price}</span> }
                            { obj.sale_price && obj.regular_price && <span className="font-12" style={{ textDecoration: 'line-through', }}>${obj.regular_price}</span> }
                            { obj.sale_price && <Badge bg="" className="font-12 bg-forest-green ms-2">${obj.sale_price}</Badge>}
                            { obj.sale_price && <Badge bg="" className="font-12 bg-khaki ms-2"><i className="fa-solid fa-arrow-trend-down"></i> - {obj.discount_percent}%</Badge>}
                            <br/>
                            {/* { obj.availability.includes("Pre-order") && <Badge bg="" className="bg-steel-blue mt-2"><span className="font-12">Pre-order</span></Badge> } */}
                        </Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                        <Button variant="primary" className="mt-auto">Go somewhere</Button>
                    </Card.Body>
                </Card>
            )}
            </div> }
            <Pagination sendToParent={dataFromPagination} lastPage={apiResponse.total_pages}></Pagination>
        </>
    );
}

export default App;