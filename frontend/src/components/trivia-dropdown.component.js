import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

export default function TriviaDropdown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="trivia-dropdown-container">
      <Button
        color="primary"
        className="trivia-dropdown-button"
        onClick={handleClick}
      >
        <div className="trivia-dropdown-label">
          <Typography variant="h6">Trivia</Typography>
        </div>
      </Button>
      <Menu
        id="fade-menu"
        className="trivia-dropdown-menu-container"
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
          to="/trivia"
          key="trivia"
        >
          <Typography variant="subtitle1">Solo Trivia</Typography>
        </MenuItem>
        <MenuItem
          component={NavLink}
          onClick={handleClose}
          className="navbar-item"
          to="/hhtrivia"
          key="hhtrivia"
        >
          <Typography variant="subtitle1">Head to Head Trivia</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
