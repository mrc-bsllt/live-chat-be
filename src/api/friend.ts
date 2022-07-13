import { Router } from "express"

import { is_auth } from '../middleware/is_auth'
import { search_friends_by_username, send_request } from '../controllers/friend-controller'

const router = Router()

router.get('/search-friends/:user_value', is_auth, search_friends_by_username)
router.post('/send-request', is_auth, send_request)

export default router