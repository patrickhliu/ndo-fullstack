import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import '../../assets/pat.scss';
import PhotoGallery from '../photoGallery/photoGallery';
import VideoSideBar from '../../components/videoSideBar/videoSideBar';

function gameCard({ mesureRef, game, index}) {
    console.log(game);

    return (
    <Card index={index} className={ index % 3 == 0 ? "col-lg-3 my-3 d-inline-block" : "col-lg-3 offset-lg-1 my-3 d-inline-block"} ref={mesureRef}>
        <Card.Title className="bg-cherry m-0 p-0 py-2" style={{ margin:0 }}>
            <p className="m-0 p-0 py-2 ms-2 d-inline-block font-16 w-100 text-truncate text-nowrap"><b>{game.title}</b></p>
        </Card.Title>
        <Card.Body>
            { game.photo_gallery.length == 1 && <img src={game.photo_gallery[0].src} className="w-100" /> }
            { game.photo_gallery.length > 1 && <PhotoGallery photos={game.photo_gallery}></PhotoGallery> }
            <div>
                    {/* <p className="float-end m-0 p-0 py-2"><i className="fa-regular fa-heart me-3"></i></p> */}
                {/* <p className="float-end m-0 p-0 py-2"><i class="fa-regular fa-note-sticky me-3"></i></p> */}
                { game.platform_code == "NINTENDO_SWITCH"   && <Badge className="font-14 mt-2 me-3" bg="cherry-br">Switch</Badge> }
                { game.platform_code == "NINTENDO_SWITCH_2" && <Badge className="font-14 mt-2 me-3" bg="cherry-inv-br">Switch <i className="fa-solid fa-2"></i></Badge> }

                <Badge className="font-14 mt-2 me-3 d-inline-block" bg="cherry-br">
                    <a target="_blank" href={"https://www.nintendo.com/" + game.url} style={{ textDecoration:"none", color:"#fff"}}><b>eShop</b></a>
                </Badge>

                { game.is_dlc_content && <Badge className="font-14 mt-2 me-3 d-inline-block" bg="info">Is DLC</Badge> }
                {/* { game.is_dlc_available && <Badge className="font-14 mt-2 me-3 d-inline-block" bg="info">DLC Available</Badge> } */}
                { game.is_upgrade && <Badge className="font-14 mt-2 me-3 d-inline-block" bg="info">Upgrade Pack</Badge> }
                { game.is_bundle && <Badge className="font-14 mt-2 me-3 d-inline-block" bg="info">Game + DLC</Badge> }
                { game.is_demo_available && <Badge className="font-14 mt-2 me-3 d-inline-block" bg="info">Has Demo</Badge> }

                { game.video_gallery.length > 0 && <VideoSideBar obj={game}></VideoSideBar> }
                <br/>
                { !game.sale_price && game.regular_price && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">${game.regular_price}</Badge> }
                { game.sale_price && game.regular_price && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="khaki-br">
                    <span style={{ textDecoration: 'line-through' }}>${game.regular_price}</span>
                    <span className="ms-2">${game.sale_price}</span>
                    <i class="fa-regular fa-circle-down ms-2"></i><span>{game.discount_percent}%</span>
                    <span className="ms-2">(Expires {game.discount_ends} Days)</span>
                </Badge> }
                <br/>
                {/* { game.availability.includes("Pre-order") && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Pre-Order</Badge> }
                { game.availability.includes("New releases") && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">New Release</Badge> }
                { game.availability.includes("Available now") && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Available Now</Badge> } */}

                { !game.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Released On {game.release_date}</Badge> }
                { game.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Available On {game.release_date} (In {game.release_future_days} Days)</Badge> }
                <br/>
                { game.editions.includes("Digital") && game.file_size && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Digital - {game.file_size}</Badge> }
                { game.editions.includes("Digital") && !game.file_size && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Digital</Badge> }
                { game.editions.includes("Physical") && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Physical</Badge> }

                { game.software_publisher && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Published By {game.software_publisher}</Badge> }
            </div>
        </Card.Body>
        { game.is_dlc_available && game.dlc_data.length > 0 && (
            <Card.Footer>
                <p class="m-0 p-0 font-14"><b>DLC</b></p>
                { game.dlc_data.map(d => (
                    <div key={d.id}>
                        <a class="font-14 me-2" target="_blank" href={"https://www.nintendo.com/" + d.url} style={{ textDecoration:"none", color:"#111"}}>
                            <b>{d.title}</b>
                        </a>
                        { !d.sale_price && d.regular_price && <span className="font-14 mt-2 me-2 d-inline-block"><b>${d.regular_price}</b></span> }
                        { d.sale_price && d.regular_price && <span className="font-14 mt-2 me-2 d-inline-block">
                            <span style={{ textDecoration: 'line-through' }}>${d.regular_price}</span>
                            <span className="ms-2"><b>${d.sale_price}</b></span>
                            {/* <i class="fa-regular fa-circle-down ms-2"></i><span><b>{d.discount_percent}%</b></span> */}
                            {/* <span className="ms-2">(Expires {game.discount_ends} Days)</span> */}
                        </span> }
                    </div>
                ))}
            </Card.Footer>
        )}
    </Card>
  )
}

export default gameCard