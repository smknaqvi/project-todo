const User = require("../models/user.model");
const { Post } = require("../models/post.model");
const origPosterValidator = (options) => (req, res, next) => {
  const opId = req.body.origPosterID;
  User.findById(opId)
    .then((user) => {
      if (user === null) {
        const error = new Error("Error: Original poster does not exist");
        error.status = 404;
        res.status(404).send(error.message);
        next(error);
      } else {
        next();
      }
    })
    .catch((err) => {
      const error = new Error("Error: Invalid poster ID");
      error.status = 400;
      res.status(400).send(error.message);
      next(error);
    });
};

const commentExistsValidator = (options) => (req, res, next) => {
  const postId = req.params.id;
  const commentId = req.params.cid;
  Post.find({ _id: postId, "comments._id": commentId })
    .then((post) => {
      if (post === undefined || post.length === 0) {
        const error = new Error("Error: Post or comment does not exist");
        error.status = 404;
        res.status(404).send(error.message);
        next(error);
      } else {
        next();
      }
    })
    .catch((err) => {
      const error = new Error("Error: Invalid post or comment ID");
      error.status = 400;
      res.status(400).send(error.message);
      next(error);
    });
};

module.exports = {
  origPosterValidator,
  commentExistsValidator,
};
