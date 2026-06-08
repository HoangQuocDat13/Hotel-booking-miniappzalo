import { Router } from 'express'
import { kiemTraMaKhuyenMai } from '../controllers/promotionController.js'

const router = Router()
router.get('/check', kiemTraMaKhuyenMai)
export default router