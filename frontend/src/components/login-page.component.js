import React, { Component } from "react";
import PropTypes from "prop-types";

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <p>Login</p>
        <button id="toggle-page-button" onClick={this.props.togglePage}>
          Signup now!
        </button>
      </div>
    );
  }
}

LoginPage.propTypes = {
  togglePage: PropTypes.func,
};
