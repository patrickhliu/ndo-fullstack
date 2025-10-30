import React, { useState, useEffect } from 'react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

function photoGallery(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };

  return (
    <>
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Swiper style={{
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mb-3"
        >
            { props.photos.map((p, i) => (
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
    <Swiper
        className=""
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        loop={true}
        modules={[FreeMode, Navigation, Thumbs]}
    >
        { props.photos.map((p, i) => (
            <SwiperSlide className="" key={i}>
                <img src={p.src} className="w-100 pointer m-0 p-0"></img>
                <div className="w-100 h-100 m-0 p-0 pointer visually-hidden flex-center"
                    style={{ position:"absolute", top:0, left:0, backgroundColor:"rgba(128, 128, 128, 0.5)" }} onClick={() => setIsOpen(true)}>
                    <i class="fa-solid fa-magnifying-glass fa-5x"></i>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
      </>
  );
};

export default photoGallery;