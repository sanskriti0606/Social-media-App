const Post = require('../../models/Post');

module.exports = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error('Post not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // Add logic to create a post
    },
    async likePost(_, { postId }, context) {
      // Add logic to like a post and update the `likeCount`
    },
  },
  Post: {
    likeCount: (parent) => parent.likes.length, // Assuming `likes` is an array in your Post model
    commentCount: (parent) => parent.comments.length, // If you have comments
  },
};
