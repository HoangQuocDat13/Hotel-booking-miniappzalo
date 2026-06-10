import jwt from 'jsonwebtoken'
import prisma from '../../lib/prisma.js'
import { layThongTinNguoiDung } from '../notification/notificationService.js'
import { JWT_SECRET, JWT_EXPIRES } from '../../config/jwt.js'

export const dangNhapZalo = async (accessToken) => {
    if (!accessToken) throw new Error('Thieu access token')

    const zaloUser = await layThongTinNguoiDung(accessToken)
    console.log("Dữ liệu Zalo trả về thực tế:", zaloUser)
    if (!zaloUser?.id) throw new Error('Token Zalo khong hop le')

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

    return { token, khachHang }
}

export const layThongTinTaiKhoan = async (userId) => {
    const khachHang = await prisma.khachHang.findUnique({ where: { id: userId } })
    if (!khachHang) throw new Error('Khong tim thay tai khoan')
    return khachHang
}

export const capNhatEmail = async (userId, email) => {
    if (!email) throw new Error('Thieu email')
    const khachHang = await prisma.khachHang.update({
        where: { id: userId },
        data: { email }
    })
    return khachHang
}
