const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        chatRooms: [Chatroom]
    }
    type Chatroom {
        _id: ID
        category: String
    }
    type Query {
        users: [User]
        user(userId: ID!): User
        rooms: [Chatroom]
        room(roomId: ID!): Chatroom
    }
    type Auth {
        token: ID!
        user: User
    }
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        createRoom(category: String!, userId: ID!): Chatroom
    }
`;

module.exports = typeDefs;