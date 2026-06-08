import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Page, Text, Header, Button, Input, DatePicker } from 'zmp-ui'
import api from '@/services/api'

function BookingPage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const maPhong = parseInt(params.get('maPhong') || '0')
    const [form, setForm] = useState({
        ngayCheckin: null as Date | null,
        ngayCheckout: null as Date | null,
        soNguoiLon: 1,
        emailNhanThongBao: '',
        yeuCau: ''
    })
    const [loading, setLoading] = useState(false)

    const handleDatPhong = async () => {
        if (!form.emailNhanThongBao) {
            alert('Vui lòng nhập email nhận thông báo')
            return
        }
        try {
            setLoading(true)
            const res: any = await api.post('/bookings', {
                maPhong,
                ...form,
                ngayCheckin: form.ngayCheckin
                    ? form.ngayCheckin.toISOString().split('T')[0]
                    : null,
                ngayCheckout: form.ngayCheckout
                    ? form.ngayCheckout.toISOString().split('T')[0]
                    : null,
            })
            navigate(`/booking/payment?maDatPhong=${res.id}`)
        } catch (err: any) {
            alert(err.message || 'Có lỗi xảy ra')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Page>
            <Header title="Thông tin đặt phòng" showBackIcon />
            <Box className="p-4 space-y-4">
                <DatePicker
                    label="Ngày check-in"
                    value={form.ngayCheckin ?? undefined}
                    onChange={(date) => setForm({ ...form, ngayCheckin: date })}
                />
                <DatePicker
                    label="Ngày check-out"
                    value={form.ngayCheckout ?? undefined}
                    onChange={(date) => setForm({ ...form, ngayCheckout: date })}
                />
                <Input
                    label="Email nhận thông báo *"
                    type="text"
                    placeholder="Bắt buộc để nhận xác nhận"
                    value={form.emailNhanThongBao}
                    onChange={(e) => setForm({ ...form, emailNhanThongBao: e.target.value })}
                />
                <Input
                    label="Yêu cầu đặc biệt"
                    placeholder="Ví dụ: phòng không hút thuốc..."
                    value={form.yeuCau}
                    onChange={(e) => setForm({ ...form, yeuCau: e.target.value })}
                />
                <Button fullWidth onClick={handleDatPhong} loading={loading} size="large">
                    Xác nhận đặt phòng
                </Button>
            </Box>
        </Page>
    )
}
export default BookingPage