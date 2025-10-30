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
        <Badge className="font-14 me-2 bg-forest-green py-2 px-2 pointer" style={{ border:"none" }} data-bs-toggle="modal" data-bs-target={"#dlc-modal-" + game.nsuid}>
            <b>DLC ({game.dlc_data.length })</b>
        </Badge>

        <div class="modal fade" id={"dlc-modal-" + game.nsuid} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="modal-title font-18" id="exampleModalLabel">DLC: { game.title }</span>
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
                                <div className="col-lg-6">
                                    <a class="font-16 me-2" target="_blank" href={"https://www.nintendo.com/" + d.url} style={{ textDecoration:"none", color:"#111"}}>
                                        <b>{d.title}</b>
                                    </a>
                                    <br/>
                                    { d.platform_code == "NINTENDO_SWITCH"   && <Badge className="font-14 mt-2 me-2 bg-cherry py-2 px-2" style={{ border:"none" }}>
                                        <a target="_blank" href="https://www.nintendo.com/us/store/products/nintendo-switch-oled-model-white-set/" style={{ textDecoration:"none", color:"#D2042D"}}><b>Switch</b></a>
                                        <b>Switch</b>
                                    </Badge> }
                                    { d.platform_code == "NINTENDO_SWITCH_2" && <Badge className="font-14 mt-2 me-2 bg-cherry-inv-br py-2 px-2" style={{ border:"none" }}>
                                        <a target="_blank" href="https://www.nintendo.com/us/store/products/nintendo-switch-2-system-123669/" style={{ textDecoration:"none", color:"#D2042D"}}><b>Switch 2</b></a>
                                    </Badge> }

                                    <Badge className="font-14 mt-2 me-2 bg-steel-blue py-2 px-2" style={{ border:"none" }}>
                                        <a target="_blank" href={"https://www.nintendo.com/" + d.url} style={{ textDecoration:"none", color:"#fff"}}><b>eShop</b></a>
                                    </Badge>
                                    <br/>
                                    { !d.sale_price && d.regular_price && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">${d.regular_price}</Badge> }

                                    <br/>
                                    { !d.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Released On {d.release_date}</Badge> }
                                    { d.release_future && <Badge className="font-14 mt-2 d-inline-block" bg="black-br">Available On {d.release_date} (In {d.release_future_days} Days)</Badge> }
                                    <br/>
                                    { d.file_size && <Badge className="font-14 mt-2 me-2 d-inline-block" bg="black-br">Digital - {d.file_size}</Badge> }
                                    <br/>
                                    { d.video_gallery.length > 0 && <div className="mt-2" style={{ overflowX:"scroll", whiteSpace:"nowrap" }} >
                                    <p className="font-16 p-2 my-0" ><b>Videos ({d.video_gallery.length})</b></p>
                                    { d.video_gallery.map(vid => {
                                        return <video className="ndo-video me-3" style={{ height:"auto", width:"250px", display:"inline-block" }} controls="true" autoplay="false" name="media">
                                                <source src={vid.src} type="video/mp4"/>
                                                </video>
                                    })}
                                    </div>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default dlcModal;