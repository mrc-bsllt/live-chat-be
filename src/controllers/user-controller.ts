import { Response, NextFunction } from 'express'
import type { RequestMod } from '../types/auth'
import UserMod from '../models/User'

export const get_user = async (req: RequestMod, res: Response, next: NextFunction) => {
  const { user_id } = req.params
  
  try {
    const user = await UserMod.findById(user_id).lean()
    delete user?.password
    delete user?.chats
    
    res.status(200).json(user)
  } catch(error) {
    res.status(500).json({ param: 'user', msg: 'User not found!' })
  }
}