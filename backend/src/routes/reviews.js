import { Router } from 'express'
import { taoVaDanhGia } from '../controllers/reviewController.js'
import auth from '../middlewares/auth.js'

const router = Router()
router.post('/', auth, taoVaDanhGia)
export default router