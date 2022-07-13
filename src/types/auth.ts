import { Request } from 'express'
import { Types } from 'mongoose'

export interface RequestMod extends Request {
  user_id?: Types.ObjectId
}

export interface JwtPayload {
  user_id: Types.ObjectId
}