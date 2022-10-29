const { User, Thought } = require("../models");

const resolvers = {
  Query: {
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
        .populate("friends")// populate the fields for friends and thoughts, so we can get any associated data in return.
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
};



module.exports = resolvers;
