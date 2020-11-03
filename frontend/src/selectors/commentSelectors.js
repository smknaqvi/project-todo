import { createSelector } from "reselect";

const getPostCommentDataFromState = (state, postId) =>
  state.createComment.getIn(["comments", postId]);

export const makeGetCommentFromState = () =>
  createSelector([getPostCommentDataFromState], (postData) => {
    return (postData && postData.getIn(["comment"])) || "";
  });

export const makeGetIsCommentUploadingFromState = () =>
  createSelector(
    [getPostCommentDataFromState],
    (postData) => (postData && postData.getIn(["isUploading"])) || false
  );
