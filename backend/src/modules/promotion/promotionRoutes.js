import { Router } from 'express'
import { kiemTraMaKhuyenMai } from './promotionController.js'

const router = Router()
router.get('/check', kiemTraMaKhuyenMai)
export default router
