export const mapPost = (post) => ({
  postId: post._id,
  origPoster: post.origPoster,
  content: post.content,
  picture: post.picture || "",
  comments: mapComments(post.comments),
});

export const mapComments = (comments) =>
  comments.map((comment) => {
    return {
      commentId: comment._id,
      content: comment.content,
      origPoster: comment.origPoster,
    };
  });
