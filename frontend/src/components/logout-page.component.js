import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export default class LogoutPage extends Component {
  logout = () => {
    this.props.logout();
  };

  componentDidMount() {
    this.logout();
  }

  render() {
    return <Redirect to="/login" />;
  }
}

LogoutPage.propTypes = {
  logout: PropTypes.func,
};
