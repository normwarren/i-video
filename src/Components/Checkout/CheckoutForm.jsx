import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { CardElement, injectStripe } from "react-stripe-elements";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await axios.post("/api/checkout/charge", {
      tokenId: token.id,
      amount: this.props.cartTotal
    });
    if (response.ok) {
      if (response.ok) this.setState({ complete: true });
    }
  }
  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};
export default injectStripe(connect(mapStateToProps)(CheckoutForm));
