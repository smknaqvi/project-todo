import React, { Component } from "react";
import LoginForm from "./login-form.component";
import PropTypes from "prop-types";

export default class LoginPage extends Component {
  login = (values) => {
    this.props.login(values);
  };

  render() {
    return (
      <div className="login-page">
        <LoginForm onSubmit={this.login} togglePage={this.props.togglePage} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func,
};
