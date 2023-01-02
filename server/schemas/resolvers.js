const { User, Chatroom } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return await User.find({}).populate('chatRooms')
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('chatRooms')
        },
        rooms: async () => {
            return await Chatroom.find({});
        },
        room: async (parent, { roomId }) => {
            return Chatroom.findOne({ _id: roomId })
        },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('User not found');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid login info. Please try again!')
            }
            const token = signToken(user);
            return { token, user };
        },
        createRoom: async (parent, { category, userId }) => {
            const room = await Chatroom.create({ category });
            await User.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { chatRooms: room._id } }
            );
        }
    }
};

module.exports = resolvers;