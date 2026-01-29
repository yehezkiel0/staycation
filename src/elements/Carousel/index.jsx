import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import propTypes from "prop-types";

export default function Carousel({
  children,
  className,
  breakpoints,
  ...props
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      navigation
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      className={className}
      breakpoints={breakpoints}
      {...props}
    >
      {children}
    </Swiper>
  );
}

Carousel.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  breakpoints: propTypes.object,
};

export { SwiperSlide };
