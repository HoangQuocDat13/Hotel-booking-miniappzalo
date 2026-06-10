import { Router } from 'express'
import { dangNhapAdmin, layDanhSachBooking, capNhatTrangThaiBooking, layThongKe } from './dashboardController.js'
import auth from '../../middlewares/auth.js'
import isAdmin from '../../middlewares/isAdmin.js'

const router = Router()
router.post('/login', dangNhapAdmin)
router.use(auth, isAdmin)
router.get('/bookings', layDanhSachBooking)
router.patch('/bookings/:id', capNhatTrangThaiBooking)
router.get('/thongke', layThongKe)
export default router
