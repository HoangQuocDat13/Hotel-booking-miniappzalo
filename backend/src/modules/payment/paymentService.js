import axios from 'axios'
import crypto from 'crypto'
import prisma from '../../lib/prisma.js'
import { ZALOPAY_CONFIG } from '../../config/zalopay.js'
import { guiEmailXacNhan } from '../notification/notificationService.js'

export const taoGiaoDichZaloPay = async (booking) => {
    const transId = Math.floor(Math.random() * 1000000)
    const appTransId = `${new Date().toISOString().slice(2, 10).replace(/-/g, '')}_${transId}`
    const appTime = Date.now()

    const order = {
        app_id: ZALOPAY_CONFIG.app_id,
        app_trans_id: appTransId,
        app_user: `user_${booking.maKhach}`,
        app_time: appTime,
        item: JSON.stringify([{ name: `Dat phong #${booking.maBooking}`, quantity: 1, price: Number(booking.tongThanhToan) }]),
        embed_data: JSON.stringify({}),
        amount: Number(booking.tongThanhToan),
        description: `Thanh toan dat phong #${booking.maBooking}`,
        bank_code: '',
        callback_url: `${process.env.BACKEND_URL}/api/payments/callback/zalopay`
    }

    const mac = crypto.createHmac('sha256', ZALOPAY_CONFIG.key1)
        .update(`${order.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`)
        .digest('hex')

    const res = await axios.post(ZALOPAY_CONFIG.endpoint, { ...order, mac })
    return { ...res.data, app_trans_id: appTransId }
}

export const xacMinhCallbackZaloPay = (data, mac) => {
    const expected = crypto.createHmac('sha256', ZALOPAY_CONFIG.key2).update(data).digest('hex')
    return expected === mac
}

export const taoThanhToanTienMat = async (maDatPhong, userId) => {
    const booking = await prisma.datPhong.findFirst({
        where: { id: maDatPhong, maKhach: userId }
    })
    if (!booking) throw new Error('Khong tim thay booking')

    const tt = await prisma.thanhToan.create({
        data: {
            maDatPhong,
            phuongThuc: 'TIEN_MAT',
            soTien: booking.tongThanhToan,
            trangThai: 'DANG_XU_LY'
        }
    })
    await prisma.datPhong.update({ where: { id: maDatPhong }, data: { trangThai: 'DA_XAC_NHAN' } })
    return tt
}

export const taoThanhToanZaloPay = async (maDatPhong, userId) => {
    const booking = await prisma.datPhong.findFirst({
        where: { id: maDatPhong, maKhach: userId }
    })
    if (!booking) throw new Error('Khong tim thay booking')

    const result = await taoGiaoDichZaloPay(booking)
    const tt = await prisma.thanhToan.create({
        data: {
            maDatPhong,
            phuongThuc: 'ZALOPAY',
            soTien: booking.tongThanhToan,
            maGiaoDich: result.app_trans_id,
            trangThai: 'DANG_XU_LY'
        }
    })
    return { thanhToan: tt, orderUrl: result.order_url }
}

export const xuLyCallbackZaloPay = async (data, mac) => {
    const isValid = xacMinhCallbackZaloPay(data, mac)
    if (!isValid) throw new Error('Mac khong hop le')

    const dataJson = JSON.parse(data)
    const tt = await prisma.thanhToan.findUnique({ where: { maGiaoDich: dataJson.app_trans_id } })
    if (!tt) throw new Error('Khong tim thay giao dich')

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

    return { return_code: 1, return_message: 'Thanh cong' }
}
