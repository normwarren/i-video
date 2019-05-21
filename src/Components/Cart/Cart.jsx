import React, { Component } from "react";
//import SignOut from '../SignOut/SignOut';
//import Search from './Search/Search';
import CartTable from "../Cart/CartTable";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { connect } from "react-redux";
import { getVideo, getUser } from "../../redux/auth.reducer";

class Cart extends Component {
  render() {
    return (
      <div>
        <CartTable />
        <Link to={`/checkout`} style={{ textDecoration: "none" }}>
          <Button>Check Out</Button>
        </Link>
      </div>
    );
  }
}

export default connect(
  state => state,
  { getVideo, getUser }
)(Cart);
