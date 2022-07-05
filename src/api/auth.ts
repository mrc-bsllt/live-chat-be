import { Router } from "express"
import { check } from "express-validator"
import type { User } from '../types/user'
import UserMod from '../models/User'
import bcrypt from 'bcrypt'

const router = Router()

import { signup, login } from '../controllers/auth-controller'

router.post('/auth/signup', [
  check('username', 'The username field must contain at least 5 characters!')
    .isLength({ min: 5 })
    .custom(async (username) => {
      const user = await UserMod.findOne({ username })
      if(user) {
        return Promise.reject('username already exist!')
      }
    }),
  check('email', 'Please enter a valid e-mail!')
    .isEmail()
    .custom(async (email) => {
      const user = await UserMod.findOne({ email })
      if(user) {
        return Promise.reject('email already exist!')
      }
    }),
  check('password', 'Invalid Password! Must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 }),
  check('confirm_password')
    .custom((confirm_password, { req }) => {
      const { password } = req.body as User

      if(password !== confirm_password) {
        return Promise.reject('Passwords must be match!')
      } else {
        return true
      }
    })
], signup)

router.post('/auth/login', [
  check('email', 'Please enter a valid e-mail!')
    .isEmail().bail()
    .custom(async (email) => {
      const user = await UserMod.findOne({ email })
      if(!user) {
        return Promise.reject('email doesn\'t exist!')
      }
    }),
  check('password', 'Invalid password!')
    .custom(async (password, { req }) => {
      const user = await UserMod.findOne({ email: req.body.email })
      if(!user) {
        return Promise.reject()
      }
      
      const is_valid = await bcrypt.compare(password, user.password)
      if(!is_valid) {
        return Promise.reject()
      } else {
        return true
      }
    }) 
], login)

export default router