import React, { useRef } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CreatePost({
  content,
  base64Image,
  setContent,
  setBase64Image,
  clearBase64Image,
  addPost,
  username,
  userId,
  acsScore,
  acsLevel,
  isImageLoading,
  isPostUploading,
}) {
  const imagesInput = useRef([]);

  const handleSetContent = ({ target: { value } }) => {
    setContent(value);
  };

  const handleSetImage = ({
    target: {
      files: [file],
    },
  }) => {
    file && setBase64Image(file);
  };

  const handleDeleteImgae = () => {
    imagesInput.current.value = null;
    clearBase64Image();
  };

  const handleMakePost = () => {
    imagesInput.current.value = null;
    addPost({ userId, content, base64Image });
  };

  const isLoading = isImageLoading || isPostUploading;
  const uploadDisabled = !content || isLoading;

  return (
    <Card className="oc-create-post">
      <CardHeader
        title={username}
        subheader={`${acsLevel} (${acsScore})`}
      />
      {isImageLoading ? (
        <Skeleton
          className="post-media"
          animation="wave"
          variant="rect"
          height="300px"
        />
      ) : (
          base64Image && (
            <CardContent className="post-media">
              <div className="remove-img-container">
                <IconButton onClick={handleDeleteImgae}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <CardMedia
                component="img"
                image={`data:image/png;base64, ${base64Image}`}
              />
            </CardContent>
          )
        )}
      <CardContent>
        <TextField
          id="outlined-textarea"
          value={content}
          onChange={handleSetContent}
          disabled={isPostUploading}
          label="Create a post"
          placeholder="Start a post..."
          rows={4}
          multiline={true}
          fullWidth={true}
          variant="outlined"
        />
      </CardContent>
      <CardActions className="action-buttons">
        <Button component="label" disabled={isLoading}>
          <ImageIcon /> Add Photo
          <input
            type="file"
            accept="image/*"
            ref={imagesInput}
            onChange={handleSetImage}
            disabled={isLoading}
            style={{ display: "none" }}
          />
        </Button>
        <div className="upload-container">
          <Button onClick={handleMakePost} disabled={uploadDisabled}>
            <SendIcon />
            Post
          </Button>
          {isPostUploading && (
            <CircularProgress className="upload-loader" size={25} />
          )}
        </div>
      </CardActions>
    </Card>
  );
}

CreatePost.propTypes = {
  content: PropTypes.string,
  base64Image: PropTypes.string,
  setContent: PropTypes.func,
  setBase64Image: PropTypes.func,
  addPost: PropTypes.func,
  username: PropTypes.string,
  userId: PropTypes.string,
  acsScore: PropTypes.number,
  acsLevel: PropTypes.string,
  isImageLoading: PropTypes.bool,
  isPostUploading: PropTypes.bool,
};
