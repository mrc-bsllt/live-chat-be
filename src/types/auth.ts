import { Request } from 'express'

export interface RequestMod extends Request {
  user_id?: string
}

export interface JwtPayload {
  user_id: string
}