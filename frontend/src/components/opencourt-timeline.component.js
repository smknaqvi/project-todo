import React, { Component } from "react";
import PostView from "./post-view.component";
import { LoadingWrapper } from "./loading-wrapper.component";
import PropTypes from "prop-types";

class OpenCourtTimeline extends Component {
  componentDidMount() {
    this.props.getOCPosts(this.props.curUserId);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.fetchCompleted !== this.props.fetchCompleted ||
      (this.props.isLoading && this.props.fetchCompleted)
    ) {
      this.props.setLoading(!this.props.fetchCompleted);
    }
  }

  createTimeline() {
    if (!this.props.isLoading) {
      const cards = this.props.posts.map((post) => {
        return (
          <PostView
            key={post.postId}
            {...post}
            users={this.props.users}
            curUserId={this.props.curUserId}
            deleteOCPost={this.props.deleteOCPost}
            deleteOCComment={this.props.deleteOCComment}
            triggerConfirmationDialog={this.props.triggerConfirmationDialog}
          />
        );
      });
      return cards;
    } else {
      return null;
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

export default LoadingWrapper(OpenCourtTimeline);
