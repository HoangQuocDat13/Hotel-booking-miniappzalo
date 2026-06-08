import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
})

export const guiEmailXacNhan = async (booking) => {
    if (!booking.emailNhanThongBao) return
    await transporter.sendMail({
        from: `"Khach San" <${process.env.EMAIL_USER}>`,
        to: booking.emailNhanThongBao,
        subject: `Xac nhan dat phong #${booking.maBooking}`,
        html: `
      <h2>Dat phong thanh cong!</h2>
      <p>Ma booking: <strong>${booking.maBooking}</strong></p>
      <p>Phong: ${booking.phong?.tenPhong}</p>
      <p>Check-in: ${new Date(booking.ngayCheckin).toLocaleDateString('vi-VN')}</p>
      <p>Check-out: ${new Date(booking.ngayCheckout).toLocaleDateString('vi-VN')}</p>
      <p>Tong tien: ${Number(booking.tongThanhToan).toLocaleString('vi-VN')} VND</p>
    `
    })
}