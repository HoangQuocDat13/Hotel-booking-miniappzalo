import cron from 'node-cron'
import prisma from '../lib/prisma.js'

export const khoiDongCronJob = () => {
    // Chay luc 1 gio sang moi ngay
    cron.schedule('0 1 * * *', async () => {
        console.log('Chay cron job cap nhat trang thai booking...')
        const homNay = new Date()
        homNay.setHours(0, 0, 0, 0)

        // Cap nhat sang DANG_LUU_TRU
        await prisma.datPhong.updateMany({
            where: { trangThai: 'DA_XAC_NHAN', ngayCheckin: { lte: homNay } },
            data: { trangThai: 'DANG_LUU_TRU' }
        })

        // Cap nhat sang HOAN_THANH
        await prisma.datPhong.updateMany({
            where: { trangThai: 'DANG_LUU_TRU', ngayCheckout: { lte: homNay } },
            data: { trangThai: 'HOAN_THANH' }
        })

        // Huy booking qua han chua thanh toan (sau 30 phut)
        const thoiGianHetHan = new Date(Date.now() - 30 * 60 * 1000)
        await prisma.datPhong.updateMany({
            where: { trangThai: 'CHO_THANH_TOAN', thoiGianDat: { lt: thoiGianHetHan } },
            data: { trangThai: 'DA_HUY' }
        })
    })
}