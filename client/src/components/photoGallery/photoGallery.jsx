import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function photoGallery(props) {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <Swiper className="swiper-container" modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} scrollbar={true}>
    {props.photos.map((p, i) => (
        <SwiperSlide className="swiper-slide" key={i}>
            <img src={p.src} className="swiper-photo pointer m-0 p-0 col-xs-12" onClick={() => setIsOpen(true)}></img>
        </SwiperSlide>
    ))}
    <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={props.photos} />
    </Swiper>
  );
};

export default photoGallery;