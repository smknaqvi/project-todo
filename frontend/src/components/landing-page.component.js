import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <div className="landingpage">
        <NavLink to={"/trivia"} className="nav-link">
          <div className="zone-pic">
            <div className="zone-text">TRIVIA</div>
          </div>
        </NavLink>
        <NavLink to={"/debate"} className="nav-link">
          <div className="zone-pic">
            <div className="zone-text">DEBATE</div>
          </div>
        </NavLink>
        <NavLink to={"/opencourt"} className="nav-link">
          <div className="zone-pic">
            <div className="zone-text">OPENCOURT</div>
          </div>
        </NavLink>
        <NavLink to={"/picks"} className="nav-link">
          <div className="zone-pic">
            <div className="zone-text">PICKS AND PREDICTIONS</div>
          </div>
        </NavLink>
      </div>
    );
  }
}
