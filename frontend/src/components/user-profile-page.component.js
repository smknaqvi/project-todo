import React, { Component } from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { withRouter } from "react-router";
import CardMedia from "@material-ui/core/CardMedia";
import AcsBadge from "../containers/acs-badge";
import CardHeader from "@material-ui/core/CardHeader";

class UserProfilePage extends Component {
  componentDidMount() {
    const userid = this.props.match.params.userid;
    this.props.getProfile(userid);
  }

  createProfilePicAndUsername = () => {
    const { profile } = this.props;
    const header = profile.displayName;
    return (
      <Card className="user-profile">
        <CardHeader
          className="user-profile-header"
          title={header}
          subheader={<AcsBadge type="icon" />}
          avatar={
            <CardMedia
              component="img"
              className="user-profile-pic"
              image={`data:image/png;base64, ${profile.picture}`}
            />
          }
        />
      </Card>
    );
  };

  createBio = () => {
    const { profile } = this.props;
    return (
      <Card className="user-profile-about-me-container">
        <div className="user-profile-about-me">About Me:</div>
        <div className="user-profile-bio-info">
          {profile.bioInfo.bio
            ? profile.bioInfo.bio
            : "User has not provided a bio."}
        </div>
      </Card>
    );
  };

  render() {
    if (this.props.fetchCompleted) {
      return (
        <div className="user-profile-container">
          {this.createProfilePicAndUsername()}
          {this.createBio()}
        </div>
      );
    } else {
      return <CircularProgress />;
    }
  }
}
export default withRouter(UserProfilePage);

UserProfilePage.propTypes = {
  togglePage: PropTypes.func,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
  setBase64Image: PropTypes.func,
  base64Image: PropTypes.string,
};
