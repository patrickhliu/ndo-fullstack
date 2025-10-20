import React, { useState, useEffect } from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function photoGallery(props) {
    const [photos, setPhotos] = useState(props.photos);

    useEffect(() => {
        console.log('photos are set...', photos);
    }, [photos]);

  return (
    <Swiper style={{ width:250, height:250, border:"2px solid red"}}
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
    >
    {props.photos.map((p, i) => (
        <SwiperSlide key={i}>
            <img src={p.url} className="swiper-photo"></img>
        </SwiperSlide>
    ))}
    </Swiper>
  );
};

export default photoGallery;