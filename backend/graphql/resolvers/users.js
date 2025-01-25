const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError, AuthenticationError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const checkAuth = require('../../util/check-auth');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      username: user.username,
      photoURL: user.photoURL,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
  Query: {
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getUser(_, { userId }) {
      try {
        const user = await User.findOne({ _id: userId });
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = 'User not found';
        throw new UserInputError('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong credentials';
        throw new UserInputError('Wrong credentials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },
    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);

      if (!valid) {
        throw new UserInputError('Errors', { errors });
      }

      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('Username is taken', {
          errors: { username: 'This username is taken' },
        });
      }

      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
    async updateUser(_, { userId, photoURL }) {
      const user = await User.findById(userId).exec();

      user.photoURL = photoURL;

      const res = await user.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: user._id,
        token,
      };
    },
    async followUser(_, { username }, context) {
      const { username: currentUsername } = checkAuth(context);

      if (username === currentUsername) {
        throw new UserInputError('You cannot follow yourself');
      }

      const userToFollow = await User.findOne({ username });
      const currentUser = await User.findOne({ username: currentUsername });

      if (!userToFollow) {
        throw new UserInputError('User not found');
      }

      if (currentUser.following.find((follow) => follow.username === username)) {
        throw new UserInputError('You are already following this user');
      }

      userToFollow.followers.push({
        username: currentUsername,
        createdAt: new Date().toISOString(),
      });

      currentUser.following.push({
        username,
        createdAt: new Date().toISOString(),
      });

      await userToFollow.save();
      await currentUser.save();

      return `You are now following ${username}`;
    },
    async unfollowUser(_, { username }, context) {
      const { username: currentUsername } = checkAuth(context);

      if (username === currentUsername) {
        throw new UserInputError('You cannot unfollow yourself');
      }

      const userToUnfollow = await User.findOne({ username });
      const currentUser = await User.findOne({ username: currentUsername });

      if (!userToUnfollow) {
        throw new UserInputError('User not found');
      }

      const followingIndex = currentUser.following.findIndex(
        (follow) => follow.username === username
      );
      const followerIndex = userToUnfollow.followers.findIndex(
        (follow) => follow.username === currentUsername
      );

      if (followingIndex === -1) {
        throw new UserInputError('You are not following this user');
      }

      currentUser.following.splice(followingIndex, 1);
      userToUnfollow.followers.splice(followerIndex, 1);

      await userToUnfollow.save();
      await currentUser.save();

      return `You have unfollowed ${username}`;
    },
  },
};
