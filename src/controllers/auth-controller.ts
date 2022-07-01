import { Request, Response, NextFunction } from "express"

import type { User } from '../types/user'

export const signup = (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body as User

  res.status(201).json({ message: 'User Created', fields: { username, email, password } })
}
