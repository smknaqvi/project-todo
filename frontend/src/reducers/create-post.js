import {
  SET_CONTENT,
  SET_BASE64_IMAGE_STARTED,
  SET_BASE64_IMAGE_SUCCEEDED,
  ADD_POST_SUCCEEDED,
  ADD_POST_STARTED,
  CLEAR_BASE64_IMAGE,
  ADD_POST_FAILED,
} from "../constants";
import { Map } from "immutable";

const initState = Map({
  content: "",
  base64Image: "",
  isImageLoading: false,
  isPostUploading: false,
});

export const createPost = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST_STARTED:
      return state.set("isPostUploading", true);
    case ADD_POST_SUCCEEDED:
      return initState;
    case ADD_POST_FAILED:
      return state.set("isPostUploading", false);
    case SET_CONTENT:
      return state.set("content", action.content);
    case SET_BASE64_IMAGE_STARTED:
      return state.set("isImageLoading", true);
    case SET_BASE64_IMAGE_SUCCEEDED:
      return state
        .set("base64Image", action.picture)
        .set("isImageLoading", false);
    case CLEAR_BASE64_IMAGE:
      return state.set("base64Image", "").set("isImageLoading", false);
    default:
      return state;
  }
};
