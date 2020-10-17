import React, { Component } from "react";
import SignupForm from "./signup-form.component";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";

export default class SignupPage extends Component {
  signup = (values) => {
    this.props.signup(values);
  };

  render() {
    return (
      <div className="signup-page">
        <Snackbar
          open={this.props.showError}
          autoHideDuration={5000}
          onClose={this.props.closeError}
        >
          <Alert severity="error" onClose={this.props.closeError}>
            {this.props.errorReason}
          </Alert>
        </Snackbar>
        <SignupForm onSubmit={this.signup} togglePage={this.props.togglePage} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  showError: PropTypes.bool,
  closeError: PropTypes.func,
  signup: PropTypes.func,
  errorReason: PropTypes.string,
  togglePage: PropTypes.func,
};
