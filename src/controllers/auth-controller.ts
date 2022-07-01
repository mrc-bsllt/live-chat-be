import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

import type { User } from '../types/user'

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }

  const { username, email, password } = req.body as User

  res.status(201).json({ message: 'User Created' })
}
