//  import the gql tagged template function from apollo-server-express
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }

  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;// ABOVE-type Query- users will return an array of ALL the users data type 
// user query- enforces a query parameter-exclamation point ! after the query parameter data type definitions indicates that for that query to be carried out, that data must exist, otherwise throw error
// thoughts will return an array of ALL the Thought data type 
 //single thought query -enforces a query parameter-returns an object of the Thought data type 

/////ABOVE-type Mutation- a login() mutation and an addUser() mutation. Both will return a User object: either the user who successfully logged in or the user who was just created on sign-up.-enforces a query parameter-a user can't be created without a username, email, and password.
// authentication to other mutations to know which user is creating a new thought, reacting to an existing thought, or adding a friend.

/////ABOVE-type-Auth type must return a token and can optionally include any other user data.


// export the typeDefs
module.exports = typeDefs;