const { User, Thought } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
// If a user tries to log in with the wrong username or password, return an authentication error.
const { signToken } = require("../utils/auth");


const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {// check for the existence of context.user. If no context.user property exists, then  user isn't authenticated- throw an AuthenticationError.
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("thoughts")
          .populate("friends");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },

    

    ////resolver function to look up thoughts for a specific user////
    thoughts: async (parent, { username }) => {
      // 1st argument-Parent-reference to the resolver that executed the nested resolver function // 2nd argument-args: This is an object of all of the values passed into a query -destructure the username parameter out// 3rd argument-context: used if we were to need the same data to be accessible by all resolvers// 4th argument-info: This will contain extra information about an operation's current state. advanced uses.

      const params = username ? { username } : {}; //check if username exists. If it exists, set params variable to an object with a username key set to that value. If it doesn't exist, return an empty object.

      return Thought.find(params).sort({ createdAt: -1 }); //find data with params variable, in descending order
    },

    //////resolver functions to handle finding a single thought//////
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id }); // destructure the _id argument value and place it into .findOne() method to look up a single thought by its _id.
    },

    //////resolver functions to handle getting all users//////
    users: async () => {
      return User.find()
        .select("-__v -password") // omit the Mongoose-specific __v property and the user's password information,
        .populate("friends") // populate the fields for friends and thoughts, so we can get any associated data in return.
        .populate("thoughts");
    },

    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select("-__v -password")
        .populate("friends")
        .populate("thoughts");
    },
  },

  /////////User resolver mutation creates a new user////////////
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args); // Mongoose User model creates a new user in the database with whatever is passed in as the args.
      const token = signToken(user); // sign a token and return an object that combines the token with the user's data.
      return { token, user };
    },
    /////login() resolver  mutation logins user with authentication////
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        // if not user throw authentication error
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);
      // ??? where is isCorrectPassword coming from????///

      if (!correctPw) {
        // if not correct password throw authentication error
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user); // sign a token and return an object that combines the token with the user's data.
      return { token, user };
    },
  },
};

// sign a token and return an object that combines the token with the user's data.

module.exports = resolvers;
