import { success, error } from '../../utils/response.js'
import * as authService from './authService.js'

export const dangNhapZalo = async (req, res) => {
    try {
        const { accessToken } = req.body
        const result = await authService.dangNhapZalo(accessToken)
        return success(res, result)
    } catch (err) {
        return error(res, err.message, 401)
    }
}

export const layThongTinTaiKhoan = async (req, res) => {
    try {
        const khachHang = await authService.layThongTinTaiKhoan(req.user.id)
        return success(res, khachHang)
    } catch (err) {
        return error(res, err.message, 404)
    }
}

export const capNhatEmail = async (req, res) => {
    try {
        const { email } = req.body
        const khachHang = await authService.capNhatEmail(req.user.id, email)
        return success(res, khachHang)
    } catch (err) {
        return error(res, err.message, 400)
    }
}
