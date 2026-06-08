import jwt from 'jsonwebtoken'
import prisma from '../lib/prisma.js'
import { layThongTinNguoiDung } from '../services/zaloService.js'
import { JWT_SECRET, JWT_EXPIRES } from '../config/jwt.js'
import { success, error } from '../utils/response.js'

export const dangNhapZalo = async (req, res) => {
    try {
        const { accessToken } = req.body
        if (!accessToken) return error(res, 'Thieu access token', 400)

        const zaloUser = await layThongTinNguoiDung(accessToken)
        if (!zaloUser?.id) return error(res, 'Token Zalo khong hop le', 401)

        let khachHang = await prisma.khachHang.findUnique({ where: { zaloId: zaloUser.id } })

        if (!khachHang) {
            khachHang = await prisma.khachHang.create({
                data: {
                    zaloId: zaloUser.id,
                    hoTen: zaloUser.name || 'Nguoi dung Zalo',
                    anhDaiDien: zaloUser.picture?.data?.url || null,
                }
            })
        }

        const token = jwt.sign(
            { id: khachHang.id, zaloId: khachHang.zaloId, role: 'khachhang' },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES }
        )

        return success(res, { token, khachHang })
    } catch (err) {
        return error(res, err.message)
    }
}

export const layThongTinTaiKhoan = async (req, res) => {
    try {
        const khachHang = await prisma.khachHang.findUnique({ where: { id: req.user.id } })
        if (!khachHang) return error(res, 'Khong tim thay tai khoan', 404)
        return success(res, khachHang)
    } catch (err) {
        return error(res, err.message)
    }
}

export const capNhatEmail = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return error(res, 'Thieu email', 400)
        const khachHang = await prisma.khachHang.update({
            where: { id: req.user.id },
            data: { email }
        })
        return success(res, khachHang)
    } catch (err) {
        return error(res, err.message)
    }
}