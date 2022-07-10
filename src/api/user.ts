import { Router } from "express"

import { is_auth } from '../middleware/is_auth'
import { get_user, update_user_image } from '../controllers/user-controller'

const router = Router()

router.get('/user/:user_id', is_auth, get_user)
router.post('/user/update-image', is_auth, update_user_image)

export default router