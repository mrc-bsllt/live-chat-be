import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import UserMod from '../models/User'

import type { User } from '../types/user'

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body as User
  const hashed_password = await bcrypt.hash(password, 12)

  const user = new UserMod({ username, email, password: hashed_password })
  await user.save()
  
  res.status(201).json({ message: 'User Created' })
}
