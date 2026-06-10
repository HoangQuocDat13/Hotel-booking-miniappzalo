import prisma from '../../lib/prisma.js'
import { guiEmailXacNhan } from '../notification/notificationService.js'

export const taoBooking = async (userId, bookingData) => {
    const { maPhong, ngayCheckin, ngayCheckout, soNguoi, emailNhanThongBao } = bookingData
    const phong = await prisma.phong.findUnique({ where: { id: maPhong } })
    if (!phong) throw new Error('Khong tim thay phong')

    const booking = await prisma.datPhong.create({
        data: {
            maBooking: `BK_${Date.now()}`,
            maKhach: userId,
            phong: { connect: { id: maPhong } },
            ngayCheckin: new Date(ngayCheckin),
            ngayCheckout: new Date(ngayCheckout),
            soNguoi,
            emailNhanThongBao,
            tongThanhToan: phong.gia
        }
    })
    await guiEmailXacNhan({ ...booking, phong })
    return booking
}

export const layLichSuDatPhong = async (userId) => {
    const bookings = await prisma.datPhong.findMany({
        where: { maKhach: userId },
        include: { phong: true }
    })
    return bookings
}

export const huyBooking = async (bookingId, userId) => {
    const booking = await prisma.datPhong.findUnique({ where: { id: parseInt(bookingId) } })
    if (!booking) throw new Error('Khong tim thay booking')
    if (booking.maKhach !== userId) throw new Error('Khong co quyen')

    await prisma.datPhong.update({
        where: { id: booking.id },
        data: { trangThai: 'DA_HUY' }
    })
    return booking
}
