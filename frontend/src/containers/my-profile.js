import { connect } from "react-redux";
import MyProfile from "../components/my-profile-page.component";
import { profileInfoRequest, updateProfile } from "../actions/my-profile";
import { closeError } from "../actions/error";
import { closeSuccess } from "../actions/success";
import { getCurrentUserProfileFromState } from "../selectors/profileSelector";
const mapStateToProps = (state) => ({
  profile: getCurrentUserProfileFromState(state),
  userId: state.auth.get("id"),
  showError: state.error.get("showError"),
  errorReason: state.error.get("errorReason"),
  getProfile: profileInfoRequest(state),
  fetchCompleted: state.profile.get("fetchCompleted"),
  base64Image: state.profile.get("base64Image"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: (id) => dispatch(profileInfoRequest(id)),
  save: (id, data) => {
    dispatch(updateProfile(id, data));
  },
  closeError: () => {
    dispatch(closeError());
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
