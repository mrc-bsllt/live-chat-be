import UserMod from '../models/User'
import type { User } from '../types/user'
import bcrypt from 'bcrypt'

const users: User[] = [
  {
    username: 'test-1',
    email: 'test-1@mail.com',
    password: 'Password_1'
  },
  {
    username: 'test-2',
    email: 'test-2@mail.com',
    password: 'Password_1'
  }
] 

export const seed_users = async () => {
  await Promise.all(users.map(async user => {
    const { username, email, password } = user
    const hashed_password = await bcrypt.hash(password, 12)
    const newUser = new UserMod({ username, email, password: hashed_password })

    await newUser.save()
  }))
  console.log('SEEDER DONE!')
}