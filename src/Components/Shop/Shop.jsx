import React, { Component } from "react";
import "./Shop.css";
//import User from "../User/User";
//import SignOut from '../SignOut/SignOut';
//import Search from './Search/Search';
import Video from "./IVideos/Video";

import { connect } from "react-redux";
import { getVideo, getUser } from "../../redux/auth.reducer";

class Shop extends Component {
  // constructor() {
  //   super();

  render() {
    return (
      // <div id="Shop__parent">
      //   <User />
      //   <SignOut history={history} />

      //   <div id="Shop__child">
      //     <Search history={history} />

      <div>
        <Video />
      </div>

      //   </div>
      // </div>
    );
  }
}

export default connect(
  state => state,
  { getVideo, getUser }
)(Shop);
