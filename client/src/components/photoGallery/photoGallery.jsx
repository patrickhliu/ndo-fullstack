import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function photoGallery(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    <Swiper className="w-100" modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectFade]} slidesPerView={1} scrollbar={false} navigation={false} spaceBetween={30} effect={'fade'}>

    {props.photos.map((p, i) => (
        <SwiperSlide className="w-100" key={i}>
            <img src={p.src} className="w-100 pointer m-0 p-0"></img>
            <div className={isHovering ? "w-100 h-100 m-0 p-0 pointer flex-center" : "w-100 h-100 m-0 p-0 pointer visually-hidden flex-center"}
                style={{ position:"absolute", top:0, left:0, backgroundColor:"rgba(128, 128, 128, 0.5)" }} onClick={() => setIsOpen(true)}>
                <i class="fa-solid fa-magnifying-glass fa-5x"></i>
            </div>
        </SwiperSlide>
    ))}
    <Lightbox open={isOpen} close={() => setIsOpen(false)} slides={props.photos} />
    </Swiper>
    </div>
  );
};

export default photoGallery;