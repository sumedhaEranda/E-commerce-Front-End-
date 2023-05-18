import React from "react";
import Slider from "react-slick";

import ava01 from "../../../assets/images/ava-1.jpg";
import ava02 from "../../../assets/images/ava-2.jpg";
import ava03 from "../../../assets/images/ava-3.jpg";

import "../../../styles/slider.css";

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <p className="review__text">
          "I absolutely love the pizza from this place! The crust is perfectly crispy and the toppings are always fresh and flavorful. Definitely my go-to spot for pizza."
        </p>
        <div className=" slider__content d-flex align-items-center gap-3 ">
          <img src={ava01} alt="avatar" className=" rounded" />
          <h6>Jhon Doe</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "I've tried many pizza places but this one is definitely my favorite.
          The cheese is always perfectly melted and the sauce is delicious.
          The crust is not too thick or too thin, just perfect!"


        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava02} alt="avatar" className=" rounded" />
          <h6>Mitchell Marsh</h6>
        </div>
      </div>
      <div>
        <p className="review__text">
          "I ordered pizza for a big group and everyone loved it.
          The delivery was on time and the pizza was still hot when it arrived.
          Great quality and taste, definitely recommend it to others.
        </p>
        <div className="slider__content d-flex align-items-center gap-3 ">
          <img src={ava03} alt="avatar" className=" rounded" />
          <h6>Steven Crock</h6>
        </div>
      </div>
    </Slider>
  );
};

export default TestimonialSlider;
