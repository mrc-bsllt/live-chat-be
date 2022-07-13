import { Response, NextFunction } from 'express'
import type { RequestMod } from '../types/auth'
import UserMod from '../models/User'
import delete_image from '../utils/delete-image'

export const get_user = async (req: RequestMod, res: Response, next: NextFunction) => {
  const { user_id } = req.params
  
  try {
    const user = await UserMod.findById(user_id).populate('friends requests_sent requests_received notifications.friend').lean()

    delete user?.password
    delete user?.chats
    
    res.status(200).json(user)
  } catch(error) {
    res.status(500).json({ param: 'user', msg: 'User not found!' })
  }
}

export const update_user_image = async (req: RequestMod, res: Response, next: NextFunction) => {
  const user_id = req.user_id

  const mimetype = req.file?.mimetype as string
  const accepted_mimetype = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
  if(!accepted_mimetype.includes(mimetype)) {
    return res.status(422).json({ param: 'image_patgh', msg: 'Invalid format!' })
  }

  const image_path = req.file?.path
  
  try {
    const user = await UserMod.findById(user_id)
    if(user) {
      if(user.image_path) {
        delete_image(user.image_path)
      }

      user.image_path = '/' + image_path as string
      await user?.save()

      res.status(201).json('User updated!')
    }
  } catch(error) {
    res.status(500).json({ message: 'User doesn\'t found!' })
  }
}