import { success, error } from '../../utils/response.js'
import * as dashboardService from './dashboardService.js'

export const dangNhapAdmin = async (req, res) => {
    try {
        const { username, password } = req.body
        const result = await dashboardService.dangNhapAdmin(username, password)
        return success(res, result)
    } catch (err) {
        return error(res, err.message, 401)
    }
}

export const layDanhSachBooking = async (req, res) => {
    try {
        const bookings = await dashboardService.layDanhSachBooking()
        return success(res, bookings)
    } catch (err) {
        return error(res, err.message)
    }
}

export const capNhatTrangThaiBooking = async (req, res) => {
    try {
        const { id } = req.params
        const { trangThai } = req.body
        await dashboardService.capNhatTrangThaiBooking(id, trangThai)
        return success(res, {})
    } catch (err) {
        return error(res, err.message)
    }
}

export const layThongKe = async (req, res) => {
    try {
        const stats = await dashboardService.layThongKe()
        return success(res, stats)
    } catch (err) {
        return error(res, err.message)
    }
}
