import React, { Component } from "react";
//import SignOut from '../SignOut/SignOut';
//import Search from './Search/Search';
import CartTable from "../Cart/CartTable";
import { Link } from "react-router-dom";
import "./Cart.css";

import { connect } from "react-redux";
import { getVideo, getUser } from "../../redux/auth.reducer";

class Cart extends Component {
  render() {
    return (
      <div class="CartComponent">
        <CartTable />
        <Link to={`/checkout`} style={{ textDecoration: "none" }}>
          <button class="CheckOutButton">Check Out</button>
        </Link>
      </div>
    );
  }
}

export default connect(
  state => state,
  { getVideo, getUser }
)(Cart);
