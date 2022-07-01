interface Message {
  text: string,
  created_at: Date
}

interface Chat {
  _id: string,
  friend_id: User
  messages: Message[],
  created_at: Date
}

export interface User {
  _id: string
  username: string
  email: string
  password: string
  confirm_password?: string
  chats: Chat[],
  created_at: Date,
  updated_at: Date
}