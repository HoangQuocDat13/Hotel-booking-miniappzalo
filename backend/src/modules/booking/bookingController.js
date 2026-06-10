import { success, error } from '../../utils/response.js'
import * as bookingService from './bookingService.js'

export const taoBooking = async (req, res) => {
    try {
        const booking = await bookingService.taoBooking(req.user.id, req.body)
        return success(res, booking)
    } catch (err) {
        return error(res, err.message, 400)
    }
}

export const layLichSuDatPhong = async (req, res) => {
    try {
        const bookings = await bookingService.layLichSuDatPhong(req.user.id)
        return success(res, bookings)
    } catch (err) {
        return error(res, err.message)
    }
}

export const huyBooking = async (req, res) => {
    try {
        const { id } = req.params
        await bookingService.huyBooking(id, req.user.id)
        return success(res, {})
    } catch (err) {
        return error(res, err.message, 400)
    }
}
