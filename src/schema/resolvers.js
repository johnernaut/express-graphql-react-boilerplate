const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Link, User } = require('../models');

module.exports = {
  Query: {
    allLinks: async () => await Link.find({}),
    currentUser: (root, data, ctx) => ctx.user
  },
  Mutation: {
    createLink: async (root, data) => {
      const newLink = new Link(data);
      const response = await newLink.save();

      return Object.assign(response, data);
    },
    signup: async (
      root,
      { name, email, password, password_confirmation },
      ctx
    ) => {
      if (password !== password_confirmation)
        throw new Error('Your passwords do not match.');

      let existing = await User.findOne({ email });
      if (!existing) {
        const hash = await bcrypt.hash(password, 10);
        let newUser = new User({
          name,
          email,
          password: hash
        });

        let user = await newUser.save();
        const id = user._id;
        const token = jwt.sign({ id }, process.env.JWT_SECRET);
        user.jwt = token;
        ctx.user = await user.save();

        return user;
      }

      throw new Error('User already exists.');
    },
    login: async (root, { email, password }, ctx) => {
      let existing = await User.findOne({ email });
      if (existing) {
        const comp = await bcrypt.compare(password, existing.password);
        if (comp) {
          const id = existing._id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET);
          existing.jwt = token;
          ctx.user = await existing.save();

          return existing;
        }

        throw new Error('Invalid password.');
      }

      throw new Error('Invalid email.');
    }
  },
  Link: {
    id: root => root._id
  }
};
