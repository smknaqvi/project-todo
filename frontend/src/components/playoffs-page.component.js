import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

export default class PlayoffsPage extends Component {
  componentDidMount() {
    this.props.getACS(this.props.userId);
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

PlayoffsPage.propTypes = {
  username: PropTypes.string,
};
