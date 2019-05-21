import React from "react";
import Slider from "react-slick";
import "./Home.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 3
};

const Home = () => (
  <div class="home">
    <img
      src="https://github.com/normwarren/i-video/blob/master/DIY-container2.jpg?raw=true"
      alt="HomeImage"
      class="home-image"
    />
    <div class="below-images">
      <p>30,0000 online courses</p>
      <p>Expert instruction</p>
      <p>Lifetime access</p>
    </div>

    <div>
      <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
      </Slider>
    </div>
  </div>
);

export default Home;
