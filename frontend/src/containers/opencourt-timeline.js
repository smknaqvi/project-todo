import { connect } from "react-redux";
import OpenCourtTimeline from "../components/opencourt-timeline.component";
import {
  fetchOCPosts,
  deletePost,
  deleteComment,
} from "../actions/opencourt-timeline";
import { SUCCEEDED } from "../constants";

const mapStateToProps = (state) => ({
  users: state.openCourtTimeline.get("users"),
  posts: state.openCourtTimeline.get("posts"),
  fetchCompleted: state.openCourtTimeline.get("apiStatus") === SUCCEEDED,
  curUserId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  getOCPosts: (curUserId) => {
    dispatch(fetchOCPosts(curUserId));
  },
  deleteOCPost: (postId) => {
    dispatch(deletePost(postId));
  },
  deleteOCComment: (pid, cid) => {
    dispatch(deleteComment(pid, cid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtTimeline);
