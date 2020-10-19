import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "./alert.component";

export default class AcsInfraDemo extends Component {
  componentDidMount() {
    this.props.getACS(this.props.userId);
  }

  handleUpdateACS = (acsChange) => {
    const { userId, updateACS, acsScore } = this.props;
    updateACS(userId, "DEMO", acsScore + acsChange);
  };
  render() {
    const {
      acsScore,
      acsLevel,
      showError,
      closeError,
      errorReason,
    } = this.props;
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
        <Snackbar open={showError} autoHideDuration={5000} onClose={closeError}>
          <Alert severity="error" onClose={closeError}>
            {errorReason}
          </Alert>
        </Snackbar>
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
  errorReason: PropTypes.string,
  showError: PropTypes.bool,
  closeError: PropTypes.func,
};
