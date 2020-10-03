import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignupPage from "../containers/signup-page";
import LoginPage from "../containers/login-page";
import PropTypes from "prop-types";

export default class AuthPage extends Component {
  getPage() {
    if (this.props.redirect) {
      return <Redirect to="/" />;
    } else if (this.props.showSignup) {
      return <SignupPage />;
    } else {
      return <LoginPage />;
    }
  }

  render() {
    return <div className="auth-page">{this.getPage()}</div>;
  }
}

AuthPage.propTypes = {
  showSignup: PropTypes.bool,
  redirect: PropTypes.bool,
};
