const router = require("express").Router();
const {
  origPosterValidator,
  commentExistsValidator,
} = require("../middleware/postValidators");
const { Post, Comment } = require("../models/post.model");

/**
 * Get all the zone posts
 * @route GET /posts
 * @group The Zone - Operations related to the zone
 * @returns {object} 200 - JSON array of all the zone posts
 * @returns {Error}  400 - Error message string
 */
router.route("/").get((_, res) => {
  Post.find()
    .sort({ updatedAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef TheZonePostBody
 * @property {string} origPosterID.required - userId of user that created the post
 * @property {string} content.required - content of post
 * @property {string} picture - base64 encoded picture in post
 */

/**
 * Create a new post in the zone
 * @route POST /posts
 * @group The Zone - Operations related to the zone
 * @param {TheZonePostBody.model} body.body.required - TheZonePostBody
 * @returns {object} 200 - JSON object of newly created post
 * @returns {Error}  404 - Error message string
 */
router.route("/").post(origPosterValidator(), (req, res) => {
  const origPoster = req.body.origPosterID;
  const content = req.body.content;
  const picture = req.body.picture || "";

  const newPost = new Post({
    origPoster,
    content,
    picture,
  });

  newPost
    .save()
    .then((post) => res.status(200).json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @typedef TheZoneCommentBody
 * @property {string} origPosterID.required - userId of user that created the post
 * @property {string} content.required - content of post
 */

/**
 * Create a new comment on a post
 * @route POST /posts/{id}/comments
 * @group The Zone - Operations related to the zone
 * @param {string} id.path.required - id of post to add comment to
 * @param {TheZoneCommentBody.model} body.body.required - TheZoneCommentBody
 * @returns {object} 200 - JSON object of updated post
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find post"
 */
router.route("/:id/comments").post(origPosterValidator(), (req, res) => {
  const postId = req.params.id;
  const origPoster = req.body.origPosterID;
  const content = req.body.content;

  const newComment = new Comment({
    origPoster,
    content,
  });

  Post.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: newComment } },
    { useFindAndModify: false, new: true, runValidators: true }
  )
    .then((updatedPost) => {
      if (updatedPost === null) {
        res.status(404).json("Error: could not find post");
      } else {
        res.status(200).json(updatedPost);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Delete a post given the post's id
 * @route DELETE /posts/{id}
 * @group The Zone - Operations related to the zone
 * @param {string} id.path.required - id of post to delete
 * @returns {object} 200 - JSON object of delete post
 * @returns {Error}  400 - Error message string
 * @returns {Error}  404 - Error message "Error: could not find post"
 */
router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then((deletedPost) => {
      if (deletedPost === null) {
        res.status(404).json("Error: could not find post");
      } else {
        res.status(200).json(deletedPost);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * Delete a comment under a given post given the comment's id
 * @route DELETE /posts/{id}/comments/{cid}
 * @group The Zone - Operations related to the zone
 * @param {string} id.path.required - id of post to delete comment under
 * @param {string} cid.path.required - id of comment to delete
 * @returns {object} 200 - Success message "Successfully deleted comment"
 * @returns {Error}  400 - Error message string
 */
router
  .route("/:id/comments/:cid")
  .delete(commentExistsValidator(), (req, res) => {
    Post.updateOne(
      { _id: req.params.id },
      { $pull: { comments: { _id: req.params.cid } } }
    )
      .then((_) => {
        res.status(200).json("Successfully deleted comment");
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;
