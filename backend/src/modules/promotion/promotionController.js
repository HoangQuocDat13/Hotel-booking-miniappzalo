import { success, error } from '../../utils/response.js'
import * as promotionService from './promotionService.js'

export const kiemTraMaKhuyenMai = async (req, res) => {
    try {
        const { code } = req.query
        const result = await promotionService.kiemTraMaKhuyenMai(code)
        return success(res, result)
    } catch (err) {
        return error(res, err.message)
    }
}
