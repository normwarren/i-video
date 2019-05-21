import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

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
    console.log(cart_item_id);
    //const { cart_item_id } = this.props;
    try {
      await axios.delete("/api/cart/remove?id=" + cart_item_id);
      console.log("my params for cart/add", cart_item_id);
      //remove from array of cartItems
      //display new array of cartItems
    } catch (err) {}
  };

  render() {
    const { cartItems } = this.state; //history
    const cartComponents = cartItems.map(cartItem => (
      <div key={cartItem.cart_item_id}>
        <img src="" alt="" />
        <h3>{cartItem.name}</h3>
        <p>${`${cartItem.price}`}</p>
        <div
          id="Video__atcContainer"
          onClick={() => this.handleRemoveFromCart(cartItem.cart_item_id)}
        >
          <span> Remove </span>
        </div>
      </div>
    ));
    return <div id="Video__parent">{cartComponents}</div>;
  }
}
const mapStateToProps = state => {
  return { ...state };
};

export default connect(mapStateToProps)(withRouter(CartTable));
