import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export default class PicksPage extends Component {
  componentDidMount() {
    if (!this.props.acsScore) {
      this.props.getACS(this.props.userId);
    }
  }

  render() {
    return (
      <Box
        bgcolor="primary.main"
        color="primary.contrastText"
        className="user-acs"
      >
        {this.props.username}: {this.props.acsScore}
      </Box>
    );
  }
}

PicksPage.propTypes = {
  username: PropTypes.string,
};
