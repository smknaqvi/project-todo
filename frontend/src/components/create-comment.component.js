import React from "react";
import PropTypes from "prop-types";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { ENTER } from "../constants";
import { CircularProgress } from "@material-ui/core";

export default function CreateComment({
  comment,
  isUploading,
  setComment,
  addComment,
  curUserId,
  postId,
}) {
  const trimmedComment = comment.trim();

  const handleSetComment = ({ target: { value } }) => {
    setComment(postId, value);
  };

  const handleMakeComment = () => {
    addComment(postId, curUserId, trimmedComment);
  };

  const handleConditionalMakeComment = ({ key }) => {
    if (key === ENTER) {
      handleMakeComment();
    }
  };

  return (
    <CardContent className="oc-create-comment">
      <TextField
        value={comment}
        disabled={isUploading}
        size="small"
        onChange={handleSetComment}
        onKeyDown={handleConditionalMakeComment}
        placeholder="Write a comment..."
        multiline={false}
        fullWidth={true}
        variant="outlined"
      />
      <Button
        onClick={handleMakeComment}
        disabled={isUploading || !trimmedComment}
      >
        {!isUploading ? <SendIcon /> : <CircularProgress size={20} />}
      </Button>
    </CardContent>
  );
}

CreateComment.propTypes = {
  comment: PropTypes.string,
  isUploading: PropTypes.bool,
  setComment: PropTypes.func,
  addComment: PropTypes.func,
  curUserId: PropTypes.string,
  postId: PropTypes.string,
};
