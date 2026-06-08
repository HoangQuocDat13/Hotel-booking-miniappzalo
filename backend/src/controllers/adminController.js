import prisma from '../lib/prisma.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES } from '../config/jwt.js'
import { success, error } from '../utils/response.js'

export const dangNhapAdmin = async (req, res) => {
    try {
        const { email, matKhau } = req.body
        const admin = await prisma.quanTriVien.findUnique({ where: { email } })
        if (!admin) return error(res, 'Email hoac mat khau khong dung', 401)
        const hopLe = await bcrypt.compare(matKhau, admin.matKhau)
        if (!hopLe) return error(res, 'Email hoac mat khau khong dung', 401)
        const token = jwt.sign({ id: admin.id, email: admin.email, role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES })
        return success(res, { token, admin: { id: admin.id, hoTen: admin.hoTen, email: admin.email, vaiTro: admin.vaiTro } })
    } catch (err) {
        return error(res, err.message)
    }
}

export const layDanhSachBooking = async (req, res) => {
    try {
        const bookings = await prisma.datPhong.findMany({
            include: { khachHang: true, phong: true, thanhToan: true },
            orderBy: { thoiGianDat: 'desc' }
        })
        return success(res, bookings)
    } catch (err) {
        return error(res, err.message)
    }
}

export const capNhatTrangThaiBooking = async (req, res) => {
    try {
        const { id } = req.params
        const { trangThai } = req.body
        const booking = await prisma.datPhong.update({
            where: { id: parseInt(id) },
            data: { trangThai }
        })
        return success(res, booking)
    } catch (err) {
        return error(res, err.message)
    }
}

export const layThongKe = async (req, res) => {
    try {
        const [tongBooking, tongPhong, tongKhachHang] = await Promise.all([
            prisma.datPhong.count(),
            prisma.phong.count(),
            prisma.khachHang.count()
        ])
        const doanhThu = await prisma.thanhToan.aggregate({
            where: { trangThai: 'THANH_CONG' },
            _sum: { soTien: true }
        })
        return success(res, { tongBooking, tongPhong, tongKhachHang, tongDoanhThu: doanhThu._sum.soTien || 0 })
    } catch (err) {
        return error(res, err.message)
    }
}