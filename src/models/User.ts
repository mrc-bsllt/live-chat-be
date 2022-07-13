import mongoose from 'mongoose'
import  { Schema } from 'mongoose'
import type { User } from '../types/user'

const userSchema = new Schema<User>({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  requests_sent: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  requests_received: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  notifications: {
    type: [{
      friend: { type: Schema.Types.ObjectId, ref: 'User' },
      text: { type: String }
    }],
    default: []
  },
  chats: {
    type: [{
      friend: { type: Schema.Types.ObjectId, ref: 'User' },
      messages: [{
        text: { type: String },
        created_at: { type: Date }
      }],
      created_at: { type: Date }
    }],
    default: []
  }
}, { timestamps: true })

export default mongoose.model<User>('User', userSchema)