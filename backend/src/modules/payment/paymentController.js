import { success, error } from '../../utils/response.js'
import * as paymentService from './paymentService.js'

export const taoThanhToan = async (req, res) => {
    try {
        const { maDatPhong, phuongThuc } = req.body

        if (phuongThuc === 'TIEN_MAT') {
            const tt = await paymentService.taoThanhToanTienMat(maDatPhong, req.user.id)
            return success(res, { thanhToan: tt, loai: 'tien_mat' })
        }

        if (phuongThuc === 'ZALOPAY') {
            const result = await paymentService.taoThanhToanZaloPay(maDatPhong, req.user.id)
            return success(res, { ...result, loai: 'zalopay' })
        }

        return error(res, 'Phuong thuc thanh toan khong hop le', 400)
    } catch (err) {
        return error(res, err.message, 400)
    }
}

export const callbackZaloPay = async (req, res) => {
    try {
        const { data, mac } = req.body
        const result = await paymentService.xuLyCallbackZaloPay(data, mac)
        return res.json(result)
    } catch (err) {
        return res.json({ return_code: -1, return_message: err.message })
    }
}
