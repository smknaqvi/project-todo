import { connect } from "react-redux";
import OpenCourtTimeline from "../components/opencourt-timeline.component";
import {
  fetchOCPosts,
  deletePost,
  deleteComment,
} from "../actions/opencourt-timeline";

const mapStateToProps = (state) => ({
  users: state.openCourtTimeline.get("users"),
  posts: state.openCourtTimeline.get("posts"),
  fetchCompleted: state.openCourtTimeline.get("fetchCompleted"),
  curUserId: state.auth.get("id"),
});

const mapDispatchToProps = (dispatch) => ({
  getOCPosts: () => {
    dispatch(fetchOCPosts());
  },
  deleteOCPost: (postId) => {
    dispatch(deletePost(postId));
  },
  deleteOCComment: (pid, cid) => {
    dispatch(deleteComment(pid, cid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenCourtTimeline);
