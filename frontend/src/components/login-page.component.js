import React, { Component } from "react";
import LoginForm from "./login-form.component";
import PropTypes from "prop-types";
import logo_transparent from "../../src/images/logo_transparent.png";

export default class LoginPage extends Component {
  login = (values) => {
    this.props.login(values);
  };

  render() {
    return (
      <>
        <div className="image-container">
          <img
            className="logo-transparent"
            src={logo_transparent}
            alt="logo_word"
          />
        </div>
        <div className="login-page">
          <LoginForm onSubmit={this.login} togglePage={this.props.togglePage} />
        </div>
      </>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
};
