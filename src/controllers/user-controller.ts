import { Response, NextFunction } from 'express'
import type { RequestMod } from '../types/auth'

export const get_user = async (req: RequestMod, res: Response, next: NextFunction) => {
  const { user_id } = req.body
}