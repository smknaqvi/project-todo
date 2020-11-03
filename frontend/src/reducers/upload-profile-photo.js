import {
  SET_PROFILE_PHOTO_SUCCEEDED,
  SET_PROFILE_PHOTO_STARTED,
  UPLOAD_PHOTO_SUCCEEDED,
  UPLOAD_PHOTO_STARTED,
  INIT_PHOTO_STARTED,
  INIT_PHOTO_SUCCEEDED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  content: "",
  profilePhoto: "",
  isImageLoading: false,
  isPostUploading: false,
  newPhotoSet: false,
});

export const uploadProfilePhoto = (state = initState, action) => {
  switch (action.type) {
    case INIT_PHOTO_STARTED:
      return state.set("profilePhoto", action.picture);
    case INIT_PHOTO_SUCCEEDED:
      return state.set("profilePhoto", action.picture);
    case UPLOAD_PHOTO_SUCCEEDED:
      return state.set("newPhotoSet", false);
    case UPLOAD_PHOTO_STARTED:
      return state.set("isPhotoUploading", true);
    case SET_PROFILE_PHOTO_STARTED:
      return state.set("isPhotoLoading", true);
    case SET_PROFILE_PHOTO_SUCCEEDED:
      return state
        .set("profilePhoto", action.picture)
        .set("isPhotoLoading", false)
        .set("newPhotoSet", true);
    default:
      return state;
  }
};
