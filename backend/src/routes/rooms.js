import { Router } from 'express'
import { layDanhSachPhong, layChiTietPhong } from '../controllers/roomController.js'

const router = Router()
router.get('/', layDanhSachPhong)
router.get('/:id', layChiTietPhong)
export default router