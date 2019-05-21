import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./Video.css";

class Video extends Component {
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
    const videoComponents = videos.map(video => (
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
    return <div class="VideoParent">{videoComponents}</div>;
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(withRouter(Video));
