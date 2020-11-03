import React, { Component } from "react";
import PostView from "./post-view.component";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class OpenCourtTimeline extends Component {
  componentDidMount() {
    this.props.getOCPosts(this.props.curUserId);
  }

  createTimeline() {
    if (this.props.fetchCompleted) {
      const cards = this.props.posts.map((post) => {
        return (
          <PostView
            key={post.postId}
            {...post}
            users={this.props.users}
            curUserId={this.props.curUserId}
            deleteOCPost={this.props.deleteOCPost}
            deleteOCComment={this.props.deleteOCComment}
          />
        );
      });
      return cards;
    } else {
      return <CircularProgress />;
    }
  }

  render() {
    return <div className="oc-timeline">{this.createTimeline()}</div>;
  }
}

OpenCourtTimeline.propTypes = {
  deleteOCPost: PropTypes.func,
  deleteOCComment: PropTypes.func,
  getOCPosts: PropTypes.func,
  users: PropTypes.object,
  posts: PropTypes.array,
  fetchCompleted: PropTypes.bool,
  fetchUnintialized: PropTypes.bool,
  curUserId: PropTypes.string,
};
