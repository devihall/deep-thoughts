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
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;// ABOVE- users will return an array of ALL the users data type 
// user query- enforces a query parameter-exclamation point ! after the query parameter data type definitions indicates that for that query to be carried out, that data must exist, otherwise throw error
// thoughts will return an array of ALL the Thought data type 
 //single thought query -enforces a query parameter-returns an object of the Thought data type 


// export the typeDefs
module.exports = typeDefs;