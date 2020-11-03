import { connect } from "react-redux";
import { closeSuccess } from "../actions/success";
import {
  setBase64Image,
  uploadPhoto,
  initProfilePhoto,
} from "../actions/upload-profile-photo";
import UploadProfilePhoto from "../components/upload-profile-photo.component";
import { getCurrentUserProfileFromState } from "../selectors/profileSelector";
import { getCurrentUserACSLevelFromState } from "../selectors/acsSelectors";

const mapStateToProps = (state) => ({
  acsLevel: getCurrentUserACSLevelFromState(state),
  profile: getCurrentUserProfileFromState(state),
  profilePhoto: state.uploadProfilePhoto.get("profilePhoto"),
  isPhotoLoading: state.uploadProfilePhoto.get("isPhotoLoading"),
  newPhotoSet: state.uploadProfilePhoto.get("newPhotoSet"),
  username: state.auth.get("username"),
  userId: state.auth.get("id"),
  showSuccess: state.success.get("showSuccess"),
  successReason: state.success.get("successReason"),
});

const mapDispatchToProps = (dispatch) => ({
  setBase64Image: (picture) => {
    dispatch(setBase64Image(picture));
  },
  uploadPhoto: (data) => {
    dispatch(uploadPhoto(data));
  },
  initProfilePhoto: (id) => {
    dispatch(initProfilePhoto(id));
  },
  closeSuccess: () => {
    dispatch(closeSuccess());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfilePhoto);
