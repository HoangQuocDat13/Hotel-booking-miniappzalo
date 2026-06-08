import prisma from '../lib/prisma.js'
import { success, error } from '../utils/response.js'

export const taoVaDanhGia = async (req, res) => {
    try {
        const { maDatPhong, diemTong, diemVeSinh, diemDichVu, diemViTri, noiDung } = req.body
        const booking = await prisma.datPhong.findFirst({
            where: { id: maDatPhong, maKhach: req.user.id, trangThai: 'HOAN_THANH' }
        })
        if (!booking) return error(res, 'Khong tim thay booking hop le de danh gia', 404)
        const daCoDanhGia = await prisma.danhGia.findUnique({ where: { maDatPhong } })
        if (daCoDanhGia) return error(res, 'Ban da danh gia booking nay roi', 409)
        const danhGia = await prisma.danhGia.create({
            data: { maDatPhong, maKhach: req.user.id, maPhong: booking.maPhong, diemTong, diemVeSinh, diemDichVu, diemViTri, noiDung }
        })
        return success(res, danhGia, 'Danh gia thanh cong', 201)
    } catch (err) {
        return error(res, err.message)
    }
}