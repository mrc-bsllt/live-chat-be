import { Router } from "express"
import { check } from "express-validator"
import type { User } from '../types/user'

const router = Router()

import { signup } from '../controllers/auth-controller'

router.post('/auth/signup', [
  check('username', 'The username field must contain at least 5 characters!')
    .isLength({ min: 5 }),
  check('email', 'Please enter a valid e-mail!')
    .isEmail(),
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

export default router