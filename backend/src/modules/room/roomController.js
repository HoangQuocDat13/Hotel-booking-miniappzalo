import { success, error } from '../../utils/response.js'
import * as roomService from './roomService.js'

export const layDanhSachPhong = async (req, res) => {
    try {
        const ketQua = await roomService.layDanhSachPhong(req.query)
        return success(res, ketQua)
    } catch (err) {
        return error(res, err.message)
    }
}

export const layChiTietPhong = async (req, res) => {
    try {
        const { id } = req.params
        const phong = await roomService.layChiTietPhong(id)
        return success(res, phong)
    } catch (err) {
        return error(res, err.message, 404)
    }
}
