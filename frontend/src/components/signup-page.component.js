import React, { Component } from "react";
import SignupForm from "./signup-form.component";
import PropTypes from "prop-types";

export default class SignupPage extends Component {
  signup = (values) => {
    this.props.signup(values);
  };

  render() {
    return (
      <div className="signup-page">
        <SignupForm onSubmit={this.signup} togglePage={this.props.togglePage} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  signup: PropTypes.func,
  togglePage: PropTypes.func,
};
