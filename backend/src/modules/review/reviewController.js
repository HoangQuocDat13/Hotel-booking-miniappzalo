import { success, error } from '../../utils/response.js'
import * as reviewService from './reviewService.js'

export const taoVaDanhGia = async (req, res) => {
    try {
        const review = await reviewService.taoVaDanhGia(req.user.id, req.body)
        return success(res, review)
    } catch (err) {
        return error(res, err.message, 400)
    }
}
