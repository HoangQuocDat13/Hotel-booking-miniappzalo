import { Router } from 'express'
import { dangNhapZalo, layThongTinTaiKhoan, capNhatEmail } from '../controllers/authController.js'
import auth from '../middlewares/auth.js'

const router = Router()
router.post('/zalo', dangNhapZalo)
router.get('/me', auth, layThongTinTaiKhoan)
router.put('/email', auth, capNhatEmail)
export default router