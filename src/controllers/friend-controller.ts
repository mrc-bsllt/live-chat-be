import { Request, Response, NextFunction } from "express"
import UserMod from '../models/User'

import type { RequestMod } from '../types/auth'

export const search_friends_by_username = async (req: RequestMod, res: Response, next: NextFunction) => {
  const { user_value } = req.params
  const regex = new RegExp("^" + user_value)
  
  const [users, count] = await Promise.all([
    UserMod.find({ username: regex }).where('_id').ne(req.user_id).limit(5), 
    UserMod.find({ username: regex }).where('_id').ne(req.user_id).count()
  ])
  res.status(200).json({ users, count })
}