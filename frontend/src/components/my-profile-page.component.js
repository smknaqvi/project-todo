import React, { Component } from "react";
import MyProfileForm from "./my-profile-form.component";
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from "prop-types";
import Alert from "./alert.component";
import { CircularProgress } from "@material-ui/core";
import UploadProfilePhoto from "../containers/upload-profile-photo";

export default class MyProfilePage extends Component {
  save = (values) => {
    this.props.save(this.props.userId, values);
  };

  componentDidMount() {
    this.props.getProfile(this.props.userId);
  }

  render() {
    if (this.props.fetchCompleted) {
      const { profile } = this.props;

      return (
        <div className="my-profile-container">
          <div className="upload-profile">
            <UploadProfilePhoto
              acsLevel={this.props.currentUserACSLevel}
              acsScore={this.props.currentUserACSScore}
            />
          </div>
          <div className="my-profile-page">
            <Snackbar
              open={this.props.showError}
              autoHideDuration={5000}
              onClose={this.props.closeError}
            >
              <Alert severity="error" onClose={this.props.closeError}>
                {this.props.errorReason}
              </Alert>
            </Snackbar>
            <Snackbar
              open={this.props.showSuccess}
              autoHideDuration={2000}
              onClose={this.props.closeSuccess}
            >
              <Alert onClose={this.props.closeSuccess} severity="success">
                {this.props.successReason}
              </Alert>
            </Snackbar>

            <MyProfileForm
              onSubmit={this.save}
              togglePage={this.props.togglePage}
              profile={this.props.profile}
              initialValues={{
                bio: profile.bioInfo.bio,
                username: profile.username,
                age: profile.bioInfo.age,
                favSport: profile.bioInfo.favSport,
                oddSport: profile.bioInfo.oddSport,
                favTeam: profile.bioInfo.favTeam,
                levelOfPlay: profile.bioInfo.levelOfPlay,
              }}
            />
          </div>
        </div>
      );
    } else {
      return <CircularProgress />;
    }
  }
}

MyProfilePage.propTypes = {
  showError: PropTypes.bool,
  closeError: PropTypes.func,
  submit: PropTypes.func,
  errorReason: PropTypes.string,
  togglePage: PropTypes.func,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
  save: PropTypes.func,
  setBase64Image: PropTypes.func,
  base64Image: PropTypes.string,
  showSuccess: PropTypes.bool,
  closeSuccess: PropTypes.func,
  successReason: PropTypes.string,
};
