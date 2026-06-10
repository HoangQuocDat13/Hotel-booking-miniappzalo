import prisma from '../../lib/prisma.js'

export const layDanhSachPhong = async (filters) => {
    const { ngayCheckin, ngayCheckout, soNguoi } = filters
    const where = {}

    if (soNguoi) {
        where.loaiPhong = { sucChua: { gte: parseInt(soNguoi) } }
    }

    if (ngayCheckin && ngayCheckout) {
        where.datPhong = {
            none: {
                AND: [
                    { trangThai: { in: ['DA_XAC_NHAN', 'DANG_LUU_TRU'] } },
                    { ngayCheckin: { lt: new Date(ngayCheckout) } },
                    { ngayCheckout: { gt: new Date(ngayCheckin) } }
                ]
            }
        }
    }

    const phong = await prisma.phong.findMany({
        where,
        include: {
            loaiPhong: true,
            anhPhong: { where: { laAnhChinh: true }, take: 1 },
            danhGia: { select: { diemTong: true } }
        }
    })

    const ketQua = phong.map(p => ({
        ...p,
        diemTrungBinh: p.danhGia.length
            ? p.danhGia.reduce((a, b) => a + b.diemTong, 0) / p.danhGia.length
            : null,
        soLuotDanhGia: p.danhGia.length
    }))

    return ketQua
}

export const layChiTietPhong = async (phongId) => {
    const phong = await prisma.phong.findUnique({
        where: { id: parseInt(phongId) },
        include: {
            loaiPhong: true,
            anhPhong: true,
            phongTienNghi: { include: { tienNghi: true } },
            bangGia: true,
            danhGia: {
                include: { khachHang: { select: { hoTen: true, anhDaiDien: true } }, anhDanhGia: true },
                orderBy: { ngayDang: 'desc' },
                take: 10
            }
        }
    })
    if (!phong) throw new Error('Khong tim thay phong')
    return phong
}
