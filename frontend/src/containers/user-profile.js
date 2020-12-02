import { connect } from "react-redux";
import UserProfilePage from "../components/user-profile-page.component";
import { profileInfoRequest } from "../actions/my-profile";
import { getCurrentUserACSLevelFromState } from "../selectors/acsSelectors";


const mapStateToProps = (state) => ({
  profile: state.userProfile.get("profile"),
  fetchCompleted: state.userProfile.get("fetchCompleted"),
  base64Image: state.userProfile.get("base64Image"),
  acsLevel: getCurrentUserACSLevelFromState(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch(profileInfoRequest(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);
