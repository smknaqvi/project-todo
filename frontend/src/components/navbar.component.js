import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { NAV_ELEMENTS } from "../constants";
import PropTypes from "prop-types";

export default class Navbar extends Component {
  createNavElements(elementMap) {
    return elementMap.map((navItem) => (
      <li className="navbar-item" key={navItem.name}>
        <NavLink exact to={navItem.link} className="nav-link">
          {navItem.name}
        </NavLink>
      </li>
    ));
  }

  createLoginButtons() {
    if (this.props.username !== null) {
      return (
        <li className="navbar-item" key="logout">
          <NavLink exact to={"/logout"} className="nav-link">
            Logout
          </NavLink>
        </li>
      );
    }
    return null;
  }

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <NavLink exact to="/" className="navbar-brand">
          SPORTCRED
        </NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            {this.createNavElements(NAV_ELEMENTS)}
          </ul>
          <ul className="navbar-nav">{this.createLoginButtons()}</ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  username: PropTypes.string,
};
