import { connect } from "react-redux";
import { setComment, addComment } from "../actions/create-comment";
import CreateComment from "../components/create-comment.component";
import {
  makeGetCommentFromState,
  makeGetIsCommentUploadingFromState,
} from "../selectors/commentSelectors";

const mapStateToProps = (state, { postId }) => {
  const getCommentFromState = makeGetCommentFromState();
  const getIsCommentUploadingFromState = makeGetIsCommentUploadingFromState();
  return {
    comment: getCommentFromState(state, postId),
    isUploading: getIsCommentUploadingFromState(state, postId),
  };
};

const mapDispatchToProps = (dispatch) => ({
  setComment: (postId, comment) => {
    dispatch(setComment(postId, comment));
  },
  addComment: (postId, curUserId, comment) => {
    dispatch(addComment(postId, curUserId, comment));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
