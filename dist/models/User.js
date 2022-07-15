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
        default: ''
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
    requests_received: [{
            type: mongoose_2.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    notifications: {
        type: [{
                friend: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
                text: { type: String },
                saw: { type: Boolean, default: false }
            }],
        default: []
    },
    chats: {
        type: [{
                friend: { type: mongoose_2.Schema.Types.ObjectId, ref: 'User' },
                messages: [{
                        text: { type: String },
                        created_at: { type: Date }
                    }],
                created_at: { type: Date }
            }],
        default: []
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('User', userSchema);
