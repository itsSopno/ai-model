import React, { useContext } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Slider.css';

// import required modules
import { FreeMode,Pagination } from 'swiper/modules';
import { AuthContext } from '../../Authcontext';

const Slider = () => {
  const { modelData } = useContext(AuthContext);

  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{ clickable: true }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {modelData.map((model) => (
          <SwiperSlide key={model._id}>
          
              <div className="expert-card">
                <img
                  src={model.image || 'https://via.placeholder.com/150'}
                  alt={model.name}
                  className="expert-image"
                />
                <h3 className="expert-name">{model.name}</h3>
                <p className="expert-title">{model.useCase}</p>
                <p className="expert-description">{model.description}</p>
              </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
export default Slider;
