import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PhotoGallery from '../photoGallery/photoGallery';
import Badge from 'react-bootstrap/Badge';

function dlcModal({ game }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
        <Badge className="font-14 me-2 bg-amaranth py-2 px-2 pointer" style={{ border:"none" }} data-bs-toggle="modal" data-bs-target={"#dlc-modal-" + game.nsuid}>
            <b>DLC ({game.dlc_data.length })</b>
        </Badge>

        <div class="modal fade" id={"dlc-modal-" + game.nsuid} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">DLC: { game.title }</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        { game.dlc_data.map(d => (
                            <div class="row" key={d.id}>
                                { d.photo_gallery.length == 1 &&
                                    <div className="col-lg-6">
                                        <img src={d.photo_gallery[0].src} className="w-100" />
                                    </div>
                                }
                                { d.photo_gallery.length > 1 &&
                                <div className="col-lg-6">
                                    <PhotoGallery photos={d.photo_gallery}></PhotoGallery>
                                </div>
                                }

                                <div className="col-lg-6" style={{ border:"2px solid red" }}>
                                    <a class="font-14 me-2" target="_blank" href={"https://www.nintendo.com/" + d.url} style={{ textDecoration:"none", color:"#111"}}>
                                        <b>{d.title}</b>
                                    </a>
                                    { d.platform_code == "NINTENDO_SWITCH"   && <button className="font-12 me-0 bg-cherry py-1 px-1 m-0 float-end" style={{ border:"none" }}>
                                        <a target="_blank" href="https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set/" style={{ textDecoration:"none", color:"#D2042D"}}><b>Switch</b></a>
                                        <b>Switch</b>
                                    </button> }
                                    { d.platform_code == "NINTENDO_SWITCH_2" && <button className="font-12 me-0 bg-cherry-inv-br py-1 px-1 float-end" style={{ border:"none" }}>
                                        <a target="_blank" href="https://www.nintendo.com/us/store/products/nintendo-switch-2-system-123669/" style={{ textDecoration:"none", color:"#D2042D"}}><b>Switch 2</b></a>
                                    </button> }

                                    <button className="font-12 me-3 bg-steel-blue py-1 px-1 float-end" style={{ border:"none" }}>
                                        <a target="_blank" href={"https://www.nintendo.com/" + d.url} style={{ textDecoration:"none", color:"#fff"}}><b>eShop</b></a>
                                    </button>
                                    <br/>
                                    { !d.sale_price && d.regular_price && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">${d.regular_price}</Badge> }

                                    <br/>
                                    { !d.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Released On {d.release_date}</Badge> }
                                    { d.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Available On {d.release_date} (In {d.release_future_days} Days)</Badge> }
                                    <br/>
                                    { d.file_size && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Digital - {d.file_size}</Badge> }
                                </div>

                                {/* {
                                <div class="scroll-container" style={{ border:"2px solid red" }}>
                                { d.video_gallery.map((v, i) => {
                                    <video className={"ndo-video w-100 mb-5"} controls="true" autoplay="false" name="media" key={i}>
                                        <source src={v.src} type="video/mp4"/>
                                    </video>
                                })}
                                </div>
                                } */}
                            </div>
                        ))}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default dlcModal;