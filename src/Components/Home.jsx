import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./Home.css";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 3
};

class Home extends Component {
  constructor() {
    super();
    this.state = {
      videos: []
    };
  }
  async componentDidMount() {
    await axios.get("/api/videos").then(res => {
      this.setState({
        videos: res.data
      });
    });
  }
  handleAddToCart = async (product_id, product_price) => {
    const { user_id } = this.props;
    try {
      await axios.post("/api/cart/add", { user_id, product_id, product_price });
    } catch (err) {}
  };
  render() {
    const { videos } = this.state; //history
    const videoComponents = videos.map((video, i) => (
      <div key={video.id} class="VideoComponent">
        <img src="" alt="" />
        <h3>{video.name}</h3>
        <p>{video.description}</p>
        <p>${`${video.regular_price}`}</p>
        <div
          class="Video_atcContainer"
          onClick={() => this.handleAddToCart(video.id, video.regular_price)}
        >
          <span> Add to Cart </span>
        </div>
      </div>
    ));
    return (
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
              <img
                src="https://github.com/normwarren/i-video/blob/master/container-video1.jpg?raw=true"
                alt="containerHouse"
              />
            </div>
            <div>
              <img
                src="https://github.com/normwarren/i-video/blob/master/LandScapeYard.jpg?raw=true"
                alt="landscape"
              />
            </div>
            <div>
              <img
                src="https://github.com/normwarren/i-video/blob/master/diy-basement.jpg?raw=true"
                alt="smallHouse"
              />
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(withRouter(Home));
