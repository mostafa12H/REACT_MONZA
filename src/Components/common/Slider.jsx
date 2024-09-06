import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import img2 from "../../assets/12.jpg";
import img3 from "../../assets/13.webp";
import img1 from "../../assets/13.jpg";

const SliderComponent = () => {
  return (
    <div className="relative bg-[#f7f7f7] dark:bg-dark-lpurple md:pt-10 overflow-hidden w-full">
      <div className="relative container mx-auto px-4 text-center">
        <Swiper
          spaceBetween={20}
          slidesPerView={1} 
          loop={true}
          speed={10000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="relative z-10 w-full swiper-container"
          breakpoints={{
            640: { slidesPerView: 1 }, 
            768: { slidesPerView: 1}, 
            1024: { slidesPerView: 2 }, 
            1280: { slidesPerView: 2},
          }}
        >
          <SwiperSlide className="swiper-slide-custom relative">
            <img
              src={img2}
              alt="Slide 1"
              className="w-full h-[16rem] sm:h-[20rem] md:h-[24rem] object-cover rounded-lg shadow-lg dark:shadow-gray-700"
            />
            <div className="slider-overlay"></div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-custom relative">
            <img
              src={img1}
              alt="Slide 2"
              className="w-full h-[16rem] sm:h-[20rem] md:h-[24rem] object-cover rounded-lg shadow-lg dark:shadow-gray-700"
            />
            <div className="slider-overlay"></div>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide-custom relative">
            <img
              src={img3}
              alt="Slide 3"
              className="w-full h-[16rem] sm:h-[20rem] md:h-[24rem] object-cover rounded-lg shadow-lg dark:shadow-gray-700"
            />
            <div className="slider-overlay"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SliderComponent;
