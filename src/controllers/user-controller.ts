import { Response, NextFunction } from 'express'
import type { RequestMod } from '../types/auth'
import UserMod from '../models/User'

export const get_user = async (req: RequestMod, res: Response, next: NextFunction) => {
  const { user_id } = req
  
  const user = await UserMod.findById(user_id)
  res.status(200).json(user)
}