import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { connect } from "react-redux";
import { updateCartTotal } from "../../redux/auth.reducer";

const Wrapper = styled.div`
  background: rgb(105, 96, 112);
`;
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
    color: hsl(0, 0%, 100%);
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
      cartItems: [],
      cartTotal: 0
    };
  }
  async componentDidMount() {
    await axios.get("/api/cart?id=" + this.props.user_id).then(res => {
      this.setState({
        cartItems: res.data
      });
    });
    await axios.get("/api/cart/total?id=" + this.props.user_id).then(res => {
      const { total_price } = res.data;
      this.setState({
        cartTotal: total_price
      });
      this.props.updateCartTotal(total_price);
    });
  }

  render() {
    const { cartItems, cartTotal } = this.state;
    const cartComponents = cartItems.map(cartItem => (
      <Row key={cartItem.cart_item_id}>
        <span className="full">
          <Row>
            <span className="black-text">
              {cartItem.name} - ${cartItem.price}
            </span>
            <span className="small-text" />
          </Row>
        </span>
      </Row>
    ));
    return (
      <Wrapper>
        <div>{cartComponents}</div>
        <div className='"small-text2'>Total: {cartTotal}</div>
      </Wrapper>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};
export default connect(
  mapStateToProps,
  { updateCartTotal }
)(CartSmall);
