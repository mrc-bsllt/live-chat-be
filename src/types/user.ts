import { Types } from 'mongoose'

interface Notification {
  friend: Types.ObjectId,
  text: string
}

interface Message {
  text: string,
  created_at: Date
}

interface Chat {
  _id: string,
  friend: Types.ObjectId[]
  messages: Message[],
  created_at: Date
}

export interface User {
  _id?: Types.ObjectId
  image_path?: string,
  username: string
  email: string
  password?: string
  confirm_password?: string
  requests_sent?: Types.ObjectId[],
  requests_received?: Types.ObjectId[],
  notifications?: Notification[],
  friends?: Types.ObjectId[],
  chats?: Chat[]
}