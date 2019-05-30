import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserId,
  updateUserDetails,
  updateUsername
} from "../../redux/auth.reducer";
import axios from "axios";
import "./Details.css";

class Details extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: ""
    };
  }
  componentDidMount() {
    axios.get("/auth/details?id=" + this.props.user_id).then(res => {
      this.props.updateUserDetails(res.data);
    });
  }
  handleFormUpdate = e => {
    this.setState({
      [e.target.name]: e.target.value || e.target.placeholder,
      loginError: false
    });
  };

  handleUpdateFormSubmit = async e => {
    e.preventDefault();
    const { firstname, lastname, email } = this.state;
    const user_id = +this.props.user_id;
    try {
      const res = await axios.put("/auth/update?id=" + user_id, {
        user_id,
        firstname,
        lastname,
        email
      });
      this.props.updateUserId(res.data.user_id);
      this.props.history.push("/info");
    } catch (err) {
      this.setState({ registerError: true });
      console.log(this.state);
    }
  };
  logout = async () => {
    await axios.get("/auth/logout");
    this.props.updateUserId(null);
    this.props.updateUserDetails({});
    this.props.updateUsername("");
    this.props.history.push("/");
  };

  render() {
    const { firstname, lastname, email } = this.props;
    return (
      <div class="DetailsContainer">
        <h2>Account Details</h2>
        {this.props.firstname ? (
          <form onSubmit={this.handleUpdateFormSubmit} class="UpdateForm">
            <h3>First Name: </h3>
            <input
              type="text"
              name="firstname"
              placeholder={firstname}
              onChange={this.handleFormUpdate}
            />
            <h3>Last Name: </h3>

            <input
              type="text"
              name="lastname"
              placeholder={lastname}
              onChange={this.handleFormUpdate}
            />
            <h3>Email: </h3>
            <input
              type="text"
              name="email"
              placeholder={email}
              onChange={this.handleFormUpdate}
            />
            <div>
              <button>Update</button>
              <button type="button" onClick={this.logout}>
                Logout
              </button>
            </div>
          </form>
        ) : (
          <div class="DetailsContainer">Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { firstname, lastname, email, user_id } = reduxState;
  return {
    firstname,
    lastname,
    email,
    user_id
  };
};

const mapDispatchToProps = {
  updateUserDetails,
  updateUserId,
  updateUsername
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
