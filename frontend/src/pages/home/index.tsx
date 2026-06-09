import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Import thêm getAccessToken từ zmp-sdk
import { authorize, getAccessToken } from 'zmp-sdk'
import { useSetAtom } from 'jotai'
import { Box, Button, Page, Text, Header } from 'zmp-ui'
import { khachHangAtom, tokenAtom } from '@/store/authState'
import api from '@/services/api'
import axios from 'axios'

function HomePage() {
    const navigate = useNavigate()
    const setKhachHang = useSetAtom(khachHangAtom)
    const setToken = useSetAtom(tokenAtom)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) navigate('/rooms')
    }, [])

    const handleDangNhap = async () => {
        try {
            // Bước 1
            await authorize({
                scopes: ['scope.userInfo', 'scope.userPhonenumber']
            })

            // Bước 2
            const accessToken = await getAccessToken({})
            alert("URL API đang gọi: " + api.defaults.baseURL)
            console.log("accessToken:", accessToken);
            // Bước 3: Gửi về Backend
            //const res: any = await api.post('/auth/zalo', { accessToken })
            const res: any = await axios.post('https://hotel-booking-backend.onrender.com/api/auth/zalo', { accessToken })
            // Bước 4: Thành công
            alert('Đăng nhập Backend thành công!');
            localStorage.setItem('token', res.token)
            setToken(res.data.token)
            setKhachHang(res.data.khachHang)
            navigate('/rooms')
        } catch (err: any) {
            alert('Lỗi Đăng nhập: ' + (err.message || JSON.stringify(err)))
        }
    }

    return (
        <Page>
            <Header title="Đặt phòng khách sạn" />
            <Box className="flex flex-col items-center justify-center h-full p-8 space-y-6">
                <Text.Title size="xLarge">Chào mừng!</Text.Title>
                <Text className="text-center text-gray-500">
                    Đăng nhập bằng Zalo để đặt phòng và quản lý lịch trình của bạn
                </Text>
                <Button fullWidth onClick={handleDangNhap} size="large">
                    Đăng nhập bằng Zalo
                </Button>
            </Box>
        </Page>
    )
}
export default HomePage