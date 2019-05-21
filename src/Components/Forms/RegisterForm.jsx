import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUserId, updateUsername } from "../../redux/auth.reducer";
import axios from "axios";
import "./RegisterForm.css";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      loginUsername: "",
      loginPassword: "",
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      loginError: false,
      loginErrorMessage: "Username or password incorrect. Please try again.",
      registerError: false,
      registerErrorMessage: "Email already in use."
    };
  }

  handleFormUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value,
      loginError: false
    });
  };

  handleSignUpFormSubmit = async e => {
    e.preventDefault();
    const { username, password, firstname, lastname, email } = this.state;
    try {
      const res = await axios.post("/auth/register", {
        username,
        password,
        firstname,
        lastname,
        email
      });

      this.props.updateUsername(username);
      this.props.updateUserId(res.data.user_id);
      this.props.history.push("/info");
    } catch (err) {
      this.setState({ registerError: true });
    }
  };

  render() {
    return (
      <div class="RegisterFormContainer">
        <h2>Sign up here</h2>
        <form onSubmit={this.handleSignUpFormSubmit} class="LoginForm">
          <input
            type="text"
            name="firstname"
            placeholder="first name"
            onChange={this.handleFormUpdate}
          />
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            onChange={this.handleFormUpdate}
          />
          <input
            type="text"
            name="email"
            placeholder="email"
            onChange={this.handleFormUpdate}
          />
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={this.handleFormUpdate}
          />
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={this.handleFormUpdate}
          />
          <button>Sign Up</button>
        </form>
        {this.state.registerError && (
          <h3 style={{ color: "tomato" }}>{this.state.registerErrorMessage}</h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = {
  updateUsername,
  updateUserId
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RegisterForm));
