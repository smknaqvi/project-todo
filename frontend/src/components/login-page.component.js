import React, { Component } from "react";
import LoginForm from "./login-form.component";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";

export default class LoginPage extends Component {
  login = (values) => {
    this.props.login(values);
  };

  render() {
    return (
      <div className="login-page">
        <Snackbar
          open={this.props.showError}
          autoHideDuration={5000}
          onClose={this.props.closeError}
        >
          <Alert severity="error" onClose={this.props.closeError}>
            {this.props.errorReason}
          </Alert>
        </Snackbar>
        <LoginForm onSubmit={this.login} togglePage={this.props.togglePage} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  showError: PropTypes.bool,
  closeError: PropTypes.func,
  login: PropTypes.func,
  errorReason: PropTypes.string,
};
