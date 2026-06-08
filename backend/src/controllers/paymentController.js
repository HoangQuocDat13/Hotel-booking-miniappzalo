import prisma from '../lib/prisma.js'
import { success, error } from '../utils/response.js'
import { taoGiaoDichZaloPay, xacMinhCallbackZaloPay } from '../services/zalopayService.js'
import { guiEmailXacNhan } from '../services/emailService.js'

export const taoThanhToan = async (req, res) => {
    try {
        const { maDatPhong, phuongThuc } = req.body
        const booking = await prisma.datPhong.findFirst({
            where: { id: maDatPhong, maKhach: req.user.id }
        })
        if (!booking) return error(res, 'Khong tim thay booking', 404)

        if (phuongThuc === 'TIEN_MAT') {
            const tt = await prisma.thanhToan.create({
                data: { maDatPhong, phuongThuc: 'TIEN_MAT', soTien: booking.tongThanhToan, trangThai: 'DANG_XU_LY' }
            })
            await prisma.datPhong.update({ where: { id: maDatPhong }, data: { trangThai: 'DA_XAC_NHAN' } })
            return success(res, { thanhToan: tt, loai: 'tien_mat' })
        }

        if (phuongThuc === 'ZALOPAY') {
            const result = await taoGiaoDichZaloPay(booking)
            const tt = await prisma.thanhToan.create({
                data: { maDatPhong, phuongThuc: 'ZALOPAY', soTien: booking.tongThanhToan, maGiaoDich: result.app_trans_id, trangThai: 'DANG_XU_LY' }
            })
            return success(res, { thanhToan: tt, orderUrl: result.order_url, loai: 'zalopay' })
        }

        return error(res, 'Phuong thuc thanh toan khong hop le', 400)
    } catch (err) {
        return error(res, err.message)
    }
}

export const callbackZaloPay = async (req, res) => {
    try {
        const { data, mac } = req.body
        const isValid = xacMinhCallbackZaloPay(data, mac)
        if (!isValid) return res.json({ return_code: -1, return_message: 'mac khong hop le' })

        const dataJson = JSON.parse(data)
        const tt = await prisma.thanhToan.findUnique({ where: { maGiaoDich: dataJson.app_trans_id } })
        if (!tt) return res.json({ return_code: -1, return_message: 'Khong tim thay giao dich' })

        await prisma.thanhToan.update({
            where: { id: tt.id },
            data: { trangThai: 'THANH_CONG', duLieuCallback: data }
        })
        await prisma.datPhong.update({
            where: { id: tt.maDatPhong },
            data: { trangThai: 'DA_XAC_NHAN' }
        })
        const booking = await prisma.datPhong.findUnique({
            where: { id: tt.maDatPhong },
            include: { khachHang: true, phong: true }
        })
        await guiEmailXacNhan(booking)

        return res.json({ return_code: 1, return_message: 'Thanh cong' })
    } catch (err) {
        return res.json({ return_code: -1, return_message: err.message })
    }
}