import { Router } from 'express'
import { taoThanhToan, callbackZaloPay } from './paymentController.js'
import auth from '../../middlewares/auth.js'

const router = Router()
router.post('/', auth, taoThanhToan)
router.post('/callback/zalopay', callbackZaloPay)
export default router
