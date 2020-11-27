import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

export default class AcsInfraDemo extends Component {
  componentDidMount() {
    this.props.getACS(this.props.userId);
  }

  handleUpdateACS = (acsChange) => {
    const { userId, updateACS, acsScore } = this.props;
    updateACS(userId, "DEMO", acsScore + acsChange);
  };
  render() {
    const { acsScore, acsLevel } = this.props;
    return (
      <>
        <div className="acs-infra-demo">
          <p>Current User ACS Score: {acsScore}</p>
          <p>Current User ACS Level: {acsLevel}</p>
        </div>
        <Button variant="outlined" onClick={() => this.handleUpdateACS(10)}>
          Increment 10
        </Button>
        <Button variant="outlined" onClick={() => this.handleUpdateACS(-10)}>
          Decrement 10
        </Button>
      </>
    );
  }
}

AcsInfraDemo.propTypes = {
  acsScore: PropTypes.number,
  acsLevel: PropTypes.string,
  getACS: PropTypes.func,
  userId: PropTypes.string,
  updateACS: PropTypes.func,
};
