import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ELEMENTS } from "../constants";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";

export default class Navbar extends Component {
  createNavElements(elementMap) {
    if (!this.props.isAuthorized) {
      return null;
    }
    return elementMap.map((navItem) => (
      <li className="navbar-item" key={navItem.name}>
        <NavLink exact to={navItem.link} className="nav-link">
          {navItem.name}
        </NavLink>
      </li>
    ));
  }

  createLogoutButtons() {
    if (!this.props.isAuthorized) {
      return null;
    }
    return (
      <li className="navbar-item" key="logout">
        <NavLink exact to={"/logout"} className="nav-link">
          Logout
        </NavLink>
      </li>
    );
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar className="navbar">
          <NavLink exact to="/" className="nav-brand active">
            SPORTCRED
          </NavLink>
          <div className="left-navbar">
            {this.createNavElements(NAV_ELEMENTS)}
          </div>
          <div className="right-navbar">{this.createLogoutButtons()}</div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  isAuthorized: PropTypes.bool,
};
