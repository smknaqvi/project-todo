import React, { Component } from "react";
import MyProfileForm from "./my-profile-form.component";
import PropTypes from "prop-types";
import { LoadingWrapper } from "./loading-wrapper.component";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import UploadProfilePhoto from "../containers/upload-profile-photo";
import { dateToISO } from "../utils/dateUtils";
import AcsBadge from "../containers/acs-badge";

class MyProfilePage extends Component {
  save = (values) => {
    this.props.save(this.props.userId, {
      ...values,
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.fetchCompleted !== this.props.fetchCompleted ||
      (this.props.isLoading && this.props.fetchCompleted)
    ) {
      this.props.setLoading(!this.props.fetchCompleted);
    }
  }

  componentDidMount() {
    this.props.getProfile(this.props.userId);
  }

  render() {
    const { profile, isLoading } = this.props;
    if (!isLoading) {
      return (
        <div className="my-profile-container">
          <div className="upload-profile">
            <Card className="side-badge" title="ACS Tiers">
              <CardHeader title="ACS Tiers" />
              <AcsBadge type="full" />
            </Card>
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
      return null;
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

export default LoadingWrapper(MyProfilePage);
