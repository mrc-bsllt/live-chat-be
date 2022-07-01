"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image_path: {
        type: String,
        required: false
    },
    friends: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    requests_sent: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    notifications: [{
            friend: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
            text: { type: String }
        }],
    chats: [{
            friend: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
            messages: [{
                    text: { type: String },
                    created_at: { type: Date }
                }],
            created_at: { type: Date }
        }],
    created_at: { type: Date },
    updated_at: { type: Date }
});
module.exports = mongoose_1.default.model('User', userSchema);
