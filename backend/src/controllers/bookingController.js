import prisma from '../lib/prisma.js'
import { success, error } from '../utils/response.js'
import { tinhSoDem } from '../utils/helpers.js'
import { guiEmailXacNhan } from '../services/emailService.js'

export const taoBooking = async (req, res) => {
    try {
        const { maPhong, ngayCheckin, ngayCheckout, soNguoiLon, soTreEm,
            emailNhanThongBao, yeuCau, maKhuyenMai, dichVuIds } = req.body

        if (!emailNhanThongBao) return error(res, 'Vui long nhap email nhan thong bao', 400)

        const phong = await prisma.phong.findUnique({ where: { id: maPhong } })
        if (!phong) return error(res, 'Phong khong ton tai', 404)

        const trungBooking = await prisma.datPhong.findFirst({
            where: {
                maPhong,
                trangThai: { in: ['DA_XAC_NHAN', 'DANG_LUU_TRU'] },
                ngayCheckin: { lt: new Date(ngayCheckout) },
                ngayCheckout: { gt: new Date(ngayCheckin) }
            }
        })
        if (trungBooking) return error(res, 'Phong da duoc dat trong khoang thoi gian nay', 409)

        const soDem = tinhSoDem(ngayCheckin, ngayCheckout)
        const tongTienPhong = Number(phong.giaCoban) * soDem

        let tongTienDichVu = 0
        const dichVuData = []
        if (dichVuIds?.length) {
            const dichVus = await prisma.dichVu.findMany({ where: { id: { in: dichVuIds } } })
            for (const dv of dichVus) {
                const donGia = Number(dv.donGia)
                const soLuong = dv.cachTinh === 'THEO_DEM' ? soDem : 1
                tongTienDichVu += donGia * soLuong
                dichVuData.push({ maDichVu: dv.id, soLuong, donGiaLucDat: donGia })
            }
        }

        let soTienGiam = 0
        if (maKhuyenMai) {
            const km = await prisma.khuyenMai.findUnique({ where: { maCode: maKhuyenMai, hoatDong: true } })
            if (km && new Date() <= new Date(km.ngayHetHan)) {
                soTienGiam = km.loaiGiam === 'PHAN_TRAM'
                    ? (tongTienPhong + tongTienDichVu) * Number(km.giaTri) / 100
                    : Number(km.giaTri)
            }
        }

        const tongThanhToan = tongTienPhong + tongTienDichVu - soTienGiam

        const booking = await prisma.datPhong.create({
            data: {
                maKhach: req.user.id,
                maPhong,
                ngayCheckin: new Date(ngayCheckin),
                ngayCheckout: new Date(ngayCheckout),
                soNguoiLon: soNguoiLon || 1,
                soTreEm: soTreEm || 0,
                emailNhanThongBao,
                yeuCau,
                tongTienPhong,
                tongTienDichVu,
                soTienGiam,
                tongThanhToan,
                datPhongDichVu: { create: dichVuData }
            },
            include: { phong: true, datPhongDichVu: true }
        })

        await prisma.khachHang.update({
            where: { id: req.user.id },
            data: { email: emailNhanThongBao }
        })

        return success(res, booking, 'Dat phong thanh cong', 201)
    } catch (err) {
        return error(res, err.message)
    }
}

export const layLichSuDatPhong = async (req, res) => {
    try {
        const bookings = await prisma.datPhong.findMany({
            where: { maKhach: req.user.id },
            include: {
                phong: { include: { anhPhong: { where: { laAnhChinh: true }, take: 1 } } },
                datPhongDichVu: { include: { dichVu: true } },
                thanhToan: true
            },
            orderBy: { thoiGianDat: 'desc' }
        })
        return success(res, bookings)
    } catch (err) {
        return error(res, err.message)
    }
}

export const huyBooking = async (req, res) => {
    try {
        const { id } = req.params
        const booking = await prisma.datPhong.findFirst({
            where: { id: parseInt(id), maKhach: req.user.id }
        })
        if (!booking) return error(res, 'Khong tim thay booking', 404)
        if (!['CHO_THANH_TOAN', 'DA_XAC_NHAN'].includes(booking.trangThai)) {
            return error(res, 'Khong the huy booking o trang thai nay', 400)
        }
        const updated = await prisma.datPhong.update({
            where: { id: parseInt(id) },
            data: { trangThai: 'DA_HUY' }
        })
        return success(res, updated, 'Huy booking thanh cong')
    } catch (err) {
        return error(res, err.message)
    }
}