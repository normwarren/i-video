import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { Elements } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import CartSmall from "../Cart/CartSmall";
import "./Checkout.css";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      purchaseEmail: "",
      loginError: false
    };
  }
  async componentDidMount() {
    const { user_id } = this.props;
    await axios.get("/api/cart?id=" + user_id).then(res => {
      this.setState({
        cartItems: res.data
      });
    });
  }
  handleFormInputUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loginError: false
    });
  };
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.stripe.createToken().then(payload => {
      this.setState({ disabled: true });
      this.props.setToken(payload.token.id);
    });
  };
  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    let response = await fetch("/charge", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: token.id
    });

    //if (response.ok) console.log("Purchase Complete!");
  }

  render() {
    const { firstname, lastname } = this.props;
    return (
      <div class="CheckoutContainer">
        <h3>
          Checkout for: {firstname} {lastname}
        </h3>
        <CartSmall />

        <div className="stripe">
          <Elements>
            <CheckoutForm />
          </Elements>
        </div>

        {this.state.loginError && <h3>{this.state.loginErrorMessage}</h3>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};
export default connect(mapStateToProps)(withRouter(Checkout));
