import { Response, NextFunction } from 'express'
import type { RequestMod, JwtPayload } from '../types/auth'
import jsonToken from 'jsonwebtoken'

export const is_auth = (req: RequestMod, res: Response, next: NextFunction) => {
  const token = req.get('Authorization')?.split(' ')[1]

  try {
    const decodedToken = jsonToken.verify(token as string, 'supersecretstring') as JwtPayload
    req.user_id = decodedToken.user_id
    next()
  } catch(error) {
    res.status(401).json({ param: 'jwt', msg: 'Not Authorized!' })
  }
}