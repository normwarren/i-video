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
  componentDidMount() {
    axios.get("/auth/details?id=" + this.props.user_id).then(res => {
      this.props.updateUserDetails(res.data);
    });
  }

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
          <>
            <h3>
              Name: {firstname} {lastname}
            </h3>
            <h3>Email: {email}</h3>
            <button onClick={this.logout}>Logout</button>
          </>
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
