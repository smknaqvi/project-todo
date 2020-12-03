import React, { Component } from "react";
import PropTypes from "prop-types";
import { LoadingWrapper } from "./loading-wrapper.component";
import Card from "@material-ui/core/Card";
import { withRouter } from "react-router";
import CardMedia from "@material-ui/core/CardMedia";
import AcsBadge from "../containers/acs-badge";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { acsToAggregate } from "../utils/acsUtils";

class UserProfilePage extends Component {
  componentDidMount() {
    const userid = this.props.match.params.userid;
    this.props.getProfile(userid);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.fetchCompleted !== this.props.fetchCompleted ||
      (this.props.isLoading && this.props.fetchCompleted)
    ) {
      this.props.setLoading(!this.props.fetchCompleted);
    }
  }

  createProfilePicAndUsername = () => {
    const { profile } = this.props;
    const header = profile.displayName;
    return (
      <Card className="user-profile">
        <CardHeader
          className="user-profile-header"
          title={<Typography variant="h4">{header}</Typography>}
          subheader={
            <AcsBadge type="icon" acsScore={acsToAggregate(profile.acs)} />
          }
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
    if (!this.props.isLoading) {
      return (
        <div className="user-profile-container">
          {this.createProfilePicAndUsername()}
          {this.createBio()}
        </div>
      );
    } else {
      return null;
    }
  }
}
export default LoadingWrapper(withRouter(UserProfilePage));

UserProfilePage.propTypes = {
  togglePage: PropTypes.func,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
  fetchCompleted: PropTypes.bool,
  setBase64Image: PropTypes.func,
  base64Image: PropTypes.string,
};
