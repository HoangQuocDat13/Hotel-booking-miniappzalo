import prisma from '../../lib/prisma.js'

export const taoVaDanhGia = async (userId, reviewData) => {
    const { maDatPhong, diem, noiDung } = reviewData
    const booking = await prisma.datPhong.findUnique({
        where: { id: maDatPhong },
        include: { khachHang: true }
    })
    if (!booking) throw new Error('Khong tim thay booking')

    const review = await prisma.danhGia.create({
        data: {
            maDatPhong,
            maKhach: userId,
            diem,
            noiDung
        }
    })
    return review
}
