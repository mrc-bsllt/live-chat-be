import { Request, Response, NextFunction } from "express"
import UserMod from '../models/User'

import { Types } from 'mongoose'
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

export const send_request = async (req: RequestMod, res: Response, next: NextFunction) => {
  const user_id = req.user_id as Types.ObjectId
  const friend_id = req.body.friend_id as Types.ObjectId

  try {
    const [user, friend] = await Promise.all([
      UserMod.findById(user_id),
      UserMod.findById(friend_id)
    ])
  
    user?.requests_sent?.push(friend_id)
    friend?.notifications?.push({ friend: user_id, text: `${user?.username} Ti ha inviato una richiesta di amicizia` })

    await Promise.all([user?.save(), friend?.save()])

    res.status(201).json({ message: 'request sent!' })
  } catch(error) {
    res.status(500).json({ param: 'server', msg: 'Server error!' })
  }
}