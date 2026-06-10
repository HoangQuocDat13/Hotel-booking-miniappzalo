import prisma from '../../lib/prisma.js'

export const dangNhapAdmin = async (username, password) => {
    // simple admin auth placeholder
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASS) {
        return { ok: true }
    }
    throw new Error('Thong tin dang nhap khong hop le')
}

export const layDanhSachBooking = async () => {
    const bookings = await prisma.datPhong.findMany({
        include: { khachHang: true, phong: true }
    })
    return bookings
}

export const capNhatTrangThaiBooking = async (bookingId, trangThai) => {
    await prisma.datPhong.update({
        where: { id: parseInt(bookingId) },
        data: { trangThai }
    })
    return { success: true }
}

export const layThongKe = async () => {
    const count = await prisma.datPhong.count()
    return { bookings: count }
}
