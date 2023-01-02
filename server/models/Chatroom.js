const { Schema, model } = require('mongoose');

const chatRoomSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true
        }
    }
);

const Chatroom = model('Chatroom', chatRoomSchema);
module.exports = Chatroom;