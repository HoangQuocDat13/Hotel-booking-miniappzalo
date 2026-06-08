import axios from 'axios'
import crypto from 'crypto'
import { ZALOPAY_CONFIG } from '../config/zalopay.js'

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