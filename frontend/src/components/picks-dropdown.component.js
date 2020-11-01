import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="picks-dropdown">
      <Button
        color="primary"
        className="picks-predicts-menu"
        onClick={handleClick}
      >
        <div className="picks-predicts-dropdown">Picks & Predictions</div>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem className="menu-item" onClick={handleClose}>
          <NavLink
            className="nav-link"
            activeStyle={{
              color: "#fff",
            }}
            exact
            to={"/picks"}
          >
            Picks
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            className="nav-link"
            activeStyle={{
              color: "#fff",
            }}
            exact
            to={"/predictions"}
          >
            Predictions
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink
            className="nav-link"
            activeStyle={{
              color: "#fff",
            }}
            exact
            to={"/playoffs"}
          >
            Playoffs
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
