import prisma from '../../lib/prisma.js'

export const kiemTraMaKhuyenMai = async (code) => {
    const promo = await prisma.khuyenMai.findFirst({
        where: { ma: code, hetHan: false }
    })
    return { valid: !!promo }
}
