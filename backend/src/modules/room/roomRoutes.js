import { Router } from 'express'
import { layDanhSachPhong, layChiTietPhong } from './roomController.js'

const router = Router()
router.get('/', layDanhSachPhong)
router.get('/:id', layChiTietPhong)
export default router
