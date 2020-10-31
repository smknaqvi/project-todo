import { connect } from "react-redux";
import {
  addPost,
  clearBase64Image,
  setBase64Image,
  setContent,
} from "../actions/create-post";
import CreatePost from "../components/create-post.component";

const mapStateToProps = (state) => ({
  content: state.createPost.get("content"),
  base64Image: state.createPost.get("base64Image"),
  isImageLoading: state.createPost.get("isImageLoading"),
  isPostUploading: state.createPost.get("isPostUploading"),
  username: state.auth.get("username"),
  userId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  setContent: (content) => {
    dispatch(setContent(content));
  },
  setBase64Image: (picture) => {
    dispatch(setBase64Image(picture));
  },
  addPost: (data) => {
    dispatch(addPost(data));
  },
  clearBase64Image: () => {
    dispatch(clearBase64Image());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
