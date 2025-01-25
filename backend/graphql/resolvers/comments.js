const Post = require('../../models/Post');
const { AuthenticationError, UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      // Check if the body is not empty
      if (body.trim() === '') {
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment body must not be empty',
          },
        });
      }

      try {
        // Find the post by its ID
        const post = await Post.findById(postId);

        if (post) {
          // Add the comment to the comments array
          post.comments.unshift({
            body,
            username: context.user.username, // Assuming you're adding the logged-in user's username
            createdAt: new Date().toISOString(),
          });

          // Save the updated post
          await post.save();

          return post;
        } else {
          throw new UserInputError('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
