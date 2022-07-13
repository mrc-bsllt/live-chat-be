import { Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import UserMod from '../models/User'
import jsonToken from 'jsonwebtoken'

import type { User } from '../types/user'
import type { RequestMod } from '../types/auth'

export const signup = async (req: RequestMod, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body as User
  const hashed_password = await bcrypt.hash(password as string, 12)

  const user = new UserMod({ username, email, password: hashed_password })
  await user.save()
  
  res.status(201).json({ message: 'User Created' })
}

export const login = async (req: RequestMod, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { email } = req.body
  try {
    const user = await UserMod.findOne({ email })
    const user_id = user?._id
  
    const token = jsonToken.sign({ user_id, email }, 'supersecretstring', { expiresIn: '8h' })
    req.user_id = user?._id
    res.status(200).json({ token, user_id, message: 'Successfully Authenticated!' })
  } catch(error) {
    res.status(500).json({ message: 'Server error!' })
  }
}
