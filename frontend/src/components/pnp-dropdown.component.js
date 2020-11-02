import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export default function PnPDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="picks-dropdown-container">
      <Button
        color="primary"
        className="picks-dropdown-button"
        onClick={handleClick}
      >
        <div className="picks-dropdown-label">
          <Typography variant="h6">Picks & Predictions</Typography>
        </div>
      </Button>
      <Menu
        id="fade-menu"
        className="picks-dropdown-menu-container"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          component={NavLink}
          onClick={handleClose}
          className="navbar-item"
          to="/picks"
          key="picks"
        >
          <Typography variant="subtitle1">Daily Picks</Typography>
        </MenuItem>
        <MenuItem
          component={NavLink}
          onClick={handleClose}
          className="navbar-item"
          to="/predictions"
          key="predictions"
        >
          <Typography variant="subtitle1">Award Predictions</Typography>
        </MenuItem>
        <MenuItem
          component={NavLink}
          onClick={handleClose}
          className="navbar-item"
          to="/playoffs"
          key="playoffs"
        >
          <Typography variant="subtitle1">Playoff Brackets</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
