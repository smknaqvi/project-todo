import { connect } from "react-redux";
import MyProfile from "../components/my-profile-page.component";
import { profileInfoRequest, updateProfile } from "../actions/my-profile";
import { getCurrentUserProfileFromState } from "../selectors/profileSelector";
const mapStateToProps = (state) => ({
  profile: getCurrentUserProfileFromState(state),
  userId: state.auth.get("id"),
  getProfile: profileInfoRequest(state),
  fetchCompleted: state.profile.get("fetchCompleted"),
  base64Image: state.profile.get("base64Image"),
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch(profileInfoRequest(id)),
  save: (id, data) => {
    dispatch(updateProfile(id, data));
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
