import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
//import Divider from "@material-ui/core/Divider";

const Wrapper = styled.div``;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  text-transform: capitalize;
  font-size: 16px;
  .full {
    flex: 1;
    margin-left: 10px;
  }
  > span {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .black-text {
    font-size: 13px;
    color: #000;
  }
  .small-text {
    font-size: 12px;
  }
`;
const Image = styled.div`
  background-image: url(${props => props.img});
  width: 62px;
  height: 62px;
  background-size: cover;
  background-position: 50%;
`;

class CartSmall extends Component {
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

  render() {
    const { cartItems } = this.state;
    //console.log(cartItems);
    const cartComponents = cartItems.map(cartItem => (
      <Row key={cartItem.cart_item_id}>
        <span className="full">
          <Row>
            <span className="black-text">{cartItem.name}</span>
          </Row>
          <div className="small-text">${cartItem.price}</div>
        </span>
      </Row>
    ));
    return <Wrapper>{cartComponents}</Wrapper>;
  }
}
const mapStateToProps = state => {
  return { ...state };
};
export default connect(mapStateToProps)(CartSmall);
