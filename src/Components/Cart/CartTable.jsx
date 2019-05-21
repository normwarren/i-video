import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./CartTable.css";

class CartTable extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: []
    };
  }
  async componentDidMount() {
    await axios.get("/api/cart?id=" + this.props.user_id).then(res => {
      this.setState({
        cartItems: res.data
      });
    });
  }

  handleRemoveFromCart = async cart_item_id => {
    try {
      await axios.delete("/api/cart/remove?id=" + cart_item_id);
      //remove from array of cartItems
      //display new array of cartItems
    } catch (err) {}
  };

  render() {
    const { cartItems } = this.state; //history
    const cartComponents = cartItems.map(cartItem => (
      <div key={cartItem.cart_item_id} class="CartTableComponent">
        <img src="" alt="" />
        <h3>{cartItem.name}</h3>
        <p>${`${cartItem.price}`}</p>
        <div
          class="Video_atcContainer"
          onClick={() => this.handleRemoveFromCart(cartItem.cart_item_id)}
        >
          <span> Remove </span>
        </div>
      </div>
    ));
    return <div class="VideoParent">{cartComponents}</div>;
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(withRouter(CartTable));
