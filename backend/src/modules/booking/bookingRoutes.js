import { Router } from 'express'
import { taoBooking, layLichSuDatPhong, huyBooking } from './bookingController.js'
import auth from '../../middlewares/auth.js'

const router = Router()
router.use(auth)
router.post('/', taoBooking)
router.get('/', layLichSuDatPhong)
router.patch('/:id/huy', huyBooking)
export default router
