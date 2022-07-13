import { Router } from "express"

import { is_auth } from '../middleware/is_auth'
import { search_friends_by_username, send_request, reject_request, accept_friendship } from '../controllers/friend-controller'

const router = Router()

router.get('/search-friends/:user_value', is_auth, search_friends_by_username)
router.post('/send-request', is_auth, send_request)
router.put('/reject-request', is_auth, reject_request)
router.put('/accept-friendship', is_auth, accept_friendship)

export default router