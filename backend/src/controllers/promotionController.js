import prisma from '../lib/prisma.js'
import { success, error } from '../utils/response.js'

export const kiemTraMaKhuyenMai = async (req, res) => {
    try {
        const { maCode, tongTien } = req.query
        const km = await prisma.khuyenMai.findUnique({
            where: { maCode, hoatDong: true }
        })
        if (!km || new Date() > new Date(km.ngayHetHan)) return error(res, 'Ma khong hop le hoac het han', 404)
        if (km.soLuotToiDa > 0 && km.soLuotDaDung >= km.soLuotToiDa) return error(res, 'Ma da het luot su dung', 400)
        if (tongTien && Number(tongTien) < Number(km.donHangToiThieu)) {
            return error(res, `Don hang toi thieu ${km.donHangToiThieu}`, 400)
        }
        const soTienGiam = km.loaiGiam === 'PHAN_TRAM'
            ? (Number(tongTien) * Number(km.giaTri)) / 100
            : Number(km.giaTri)
        return success(res, { km, soTienGiam })
    } catch (err) {
        return error(res, err.message)
    }
}