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
    <Swiper className="w-100" modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]} slidesPerView={1} scrollbar={true}>
    {props.videos.map((v, i) => (
        <SwiperSlide className="w-100" key={i}>
            <video className="w-100" controls="true" autoplay="false" name="media">
                <source src={v.src} type="video/mp4"/>
            </video>
        </SwiperSlide>
    ))}
    <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={props.videos} />
    </Swiper>
  );
};

export default photoGallery;