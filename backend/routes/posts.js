const router = require("express").Router();
const {
  origPosterValidator,
  commentExistsValidator,
} = require("../middleware/postValidators");
const { Post, Comment } = require("../models/post.model");

router.route("/").get((_, res) => {
  Post.find()
    .sort({ updatedAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
});

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
