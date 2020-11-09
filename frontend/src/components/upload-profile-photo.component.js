import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import ImageIcon from "@material-ui/icons/Image";
import SendIcon from "@material-ui/icons/Send";
import CardMedia from "@material-ui/core/CardMedia";
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UploadProfilePhoto({
  content,
  profile,
  profilePhoto,
  uploadPhoto,
  setBase64Image,
  userId,
  isPhotoLoading,
  isPostUploading,
  isLoading,
  initProfilePhoto,
  newPhotoSet,
  acsLevel,
}) {
  useEffect(() => {
    initProfilePhoto(profile._id);
  }, [initProfilePhoto, profile._id]);

  const imagesInput = useRef([]);

  const handleSetImage = ({
    target: {
      files: [file],
    },
  }) => {
    file && setBase64Image(file);
  };

  const handleUploadPhoto = () => {
    imagesInput.current.value = null;
    uploadPhoto({ userId, content, profilePhoto });
  };

  return (
    <Card className="oc-create-post">
      <CardHeader
        title={
          profile.displayName + " - " + acsLevel + " (" + profile.acs + ")"
        }
      />
      {isPhotoLoading ? (
        <Skeleton
          className="post-media"
          animation="wave"
          variant="rect"
          height="300px"
        />
      ) : (
        profilePhoto && (
          <CardContent className="post-media">
            <CardMedia
              component="img"
              image={`data:image/png;base64, ${profilePhoto}`}
            />
          </CardContent>
        )
      )}

      <CardActions className="action-buttons">
        <Button component="label" disabled={isLoading}>
          <ImageIcon /> Change Profile Photo
          <input
            className="hidden-input"
            type="file"
            accept="image/*"
            ref={imagesInput}
            onChange={handleSetImage}
            disabled={isLoading}
          />
        </Button>
        <div className="upload-container">
          <Button onClick={handleUploadPhoto} disabled={!newPhotoSet}>
            <SendIcon />
            Upload
          </Button>
          {isPostUploading && (
            <CircularProgress className="upload-loader" size={25} />
          )}
        </div>
      </CardActions>
    </Card>
  );
}

UploadProfilePhoto.propTypes = {
  profile: PropTypes.object,
  content: PropTypes.string,
  profilePhoto: PropTypes.string,
  setContent: PropTypes.func,
  setBase64Image: PropTypes.func,
  uploadPhoto: PropTypes.func,
  username: PropTypes.string,
  userId: PropTypes.string,
  acsScore: PropTypes.number,
  acsLevel: PropTypes.string,
  isPhotoLoading: PropTypes.bool,
  isPostUploading: PropTypes.bool,
  initProfilePhoto: PropTypes.func,
  newPhotoSet: PropTypes.bool,
  showSuccess: PropTypes.bool,
  closeSuccess: PropTypes.func,
  successReason: PropTypes.string,
};
