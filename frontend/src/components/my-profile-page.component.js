import React, { Component } from "react";
import MyProfileForm from "./my-profile-form.component";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import UploadProfilePhoto from "../containers/upload-profile-photo";
import { dateToISO } from "../utils/dateUtils";

export default class MyProfilePage extends Component {
  save = (values) => {
    this.props.save(this.props.userId, {
      ...values,
    });
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
            <MyProfileForm
              onSubmit={this.save}
              togglePage={this.props.togglePage}
              profile={this.props.profile}
              initialValues={{
                bio: profile.bioInfo.bio,
                username: profile.username,
                favSport: profile.bioInfo.favSport,
                oddSport: profile.bioInfo.oddSport,
                favTeam: profile.bioInfo.favTeam,
                levelOfPlay: profile.bioInfo.levelOfPlay,
                birthday: dateToISO(new Date(profile.bioInfo.birthday)),
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
  submit: PropTypes.func,
  togglePage: PropTypes.func,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
  save: PropTypes.func,
  setBase64Image: PropTypes.func,
  base64Image: PropTypes.string,
};
