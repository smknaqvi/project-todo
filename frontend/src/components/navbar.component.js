import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ELEMENTS } from "../constants";
import { MY_PROFILE_NAV_ELEMENT } from "../constants";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import PnPDropdown from "./pnp-dropdown.component";
import { Typography } from "@material-ui/core";

export default class Navbar extends Component {
  createNavElements(elementMap) {
    if (!this.props.isAuthorized) {
      return null;
    }
    return elementMap.map((navItem) => (
      <Button
        component={NavLink}
        className="navbar-item"
        to={navItem.link}
        key={navItem.name}
      >
        <Typography variant="h6">{navItem.name}</Typography>
      </Button>
    ));
  }

  createLogoutButtons() {
    if (!this.props.isAuthorized) {
      return null;
    }
    return (
      <Button
        component={NavLink}
        className="navbar-item"
        to="/logout"
        key="logout"
      >
        <Typography variant="subtitle1">Logout</Typography>
      </Button>
    );
  }

  createPnPDropdown() {
    if (!this.props.isAuthorized) {
      return null;
    }
    return <PnPDropdown />;
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar className="navbar">
          <NavLink exact to="/" className="nav-brand active">
            <Typography variant="h6">SPORTCRED</Typography>
          </NavLink>
          <div className="left-navbar">
            {this.createNavElements(NAV_ELEMENTS)}
            {this.createPnPDropdown()}
            {this.createNavElements(MY_PROFILE_NAV_ELEMENT)}
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
