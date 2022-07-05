import { Router } from "express"

import { is_auth } from '../middleware/is_auth'
import { get_user } from '../controllers/user-controller'

const router = Router()

router.get('/user', is_auth, get_user)

export default router