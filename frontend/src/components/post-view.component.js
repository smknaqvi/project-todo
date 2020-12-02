import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CreateComment from "../containers/create-comment";
import ConfirmationDialog from "../containers/confirmation-dialog";
import AcsBadge from "../containers/acs-badge";
import Link from "@material-ui/core/Link";
import {
  DELETE_COMMENT,
  DELETE_COMMENT_TITLE,
  DELETE_POST,
  DELETE_POST_TITLE,
} from "../constants";
import { acsToAggregate } from "../utils/acsUtils";
import { USER_PROFILE_LINKS } from "../constants";

export default class PostView extends Component {
  createCardMedia() {
    if (this.props.picture) {
      return (
        <div className="post-media">
          <CardMedia
            component="img"
            src={`data:image/png;base64, ${this.props.picture}`}
          />
        </div>
      );
    }
  }

  createCommentDelete(origPoster, commentId) {
    if (origPoster === this.props.curUserId) {
      return (
        <IconButton
          edge="end"
          onClick={() =>
            this.props.triggerConfirmationDialog({
              dialogMessage: DELETE_COMMENT,
              dialogTitle: DELETE_COMMENT_TITLE,
              onAcceptChange: () => {
                this.props.deleteOCComment(this.props.postId, commentId);
              },
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }

  createCommentDisplayName(username, acsLevel, acs) {
    return username + " - " + acsLevel + " (" + acs + ")";
  }

  createComments() {
    if (this.props.comments.length === 0) {
      return null;
    }
    const comments = this.props.comments.map((comment) => {
      const commenter = this.props.users[comment.origPoster];
      const profileLink = this.generateProfileLink(comment.origPoster);
      return (
        <div key={"root-" + comment.commentId}>
          <Divider />
          <ListItem>
            <div className="inner-comment-box">
              <div className="avatar">
                <ListItemAvatar>
                  <Avatar src={`data:image/png;base64, ${commenter.picture}`} />
                </ListItemAvatar>
              </div>
              <ListItemText
                secondary={
                  <>
                    <Link
                      component={NavLink}
                      className="navbar-item"
                      to={profileLink}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        className="inline-comment"
                        color="textPrimary"
                      >
                        {this.createCommentDisplayName(
                          commenter.username,
                          commenter.acsLevel,
                          commenter.acs
                        )}
                      </Typography>
                    </Link>

                    {" - " + comment.content}
                  </>
                }
              />
              {this.createCommentDelete(comment.origPoster, comment.commentId)}
            </div>
          </ListItem>
        </div>
      );
    });
    return <List className="comments">{comments}</List>;
  }

  createHeaderButtons() {
    if (this.props.origPoster === this.props.curUserId) {
      return (
        <IconButton
          aria-label="delete-post"
          onClick={() =>
            this.props.triggerConfirmationDialog({
              dialogMessage: DELETE_POST,
              dialogTitle: DELETE_POST_TITLE,
              onAcceptChange: () => {
                this.props.deleteOCPost(this.props.postId);
              },
            })
          }
        >
          <DeleteIcon />
        </IconButton>
      );
    }
  }

  generateProfileLink = (userId) => {
    const profileLink =
      userId === this.props.curUserId
        ? USER_PROFILE_LINKS[0].link
        : USER_PROFILE_LINKS[1].link + userId;
    return profileLink;
  };

  render() {
    const curUser = this.props.users[this.props.origPoster];
    const profileLink = this.generateProfileLink(this.props.origPoster);
    return (
      <div className="post-view">
        <Card>
          <CardHeader
            title={
              <Link component={NavLink} to={profileLink}>
                {curUser.username}
              </Link>
            }
            subheader={
              <AcsBadge type="icon" acsScore={acsToAggregate(curUser.acs)} />
            }
            action={this.createHeaderButtons()}
          />

          {this.createCardMedia()}
          <CardContent>
            <Typography paragraph>{this.props.content}</Typography>
          </CardContent>
          <Divider />
          <CreateComment
            curUserId={this.props.curUserId}
            postId={this.props.postId}
          />
          {this.createComments()}
        </Card>
        <ConfirmationDialog />
      </div>
    );
  }
}

PostView.propTypes = {
  deleteOCPost: PropTypes.func,
  deleteOCComment: PropTypes.func,
  content: PropTypes.string,
  postId: PropTypes.string,
  origPoster: PropTypes.string,
  picture: PropTypes.string,
  comments: PropTypes.array,
  users: PropTypes.object,
  curUserId: PropTypes.string,
};
