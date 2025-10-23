import React, { useState, useEffect } from 'react';
import $ from 'jquery';

function videoSideBar(props) {

    const handleClose = () => {
        let el = $(".footage-" + props.obj.nsuid);
        for(let o of el) {
            $(o).trigger('pause');
        };
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            handleClose();
        }
    });

    return (
        <div className="d-inline-block">
            <button class="btn btn-sm bg-cherry-br" type="button" data-bs-toggle="offcanvas" data-bs-target={"#videos-" + props.obj.nsuid} aria-controls={"videos-" + props.obj.nsuid}><i class="fa-regular fa-circle-play"></i></button>
            <div class="offcanvas offcanvas-start" tabindex="-1" id={"videos-" + props.obj.nsuid} aria-labelledby="video-title">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="video-title">{props.obj.title}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div class="offcanvas-body">
                    { props.obj.video_gallery.map((v, i) => (
                        <video className={"w-100 mb-5 footage-" + props.obj.nsuid} controls="true" autoplay="false" name="media">
                            <source src={v.src} type="video/mp4"/>
                        </video>
                    ))}
                </div>
            </div>
        </div>
  )
}

export default videoSideBar