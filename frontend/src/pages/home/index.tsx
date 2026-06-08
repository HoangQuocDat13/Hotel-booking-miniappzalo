import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authorize } from 'zmp-sdk'
import { useSetAtom } from 'jotai'
import { Box, Button, Page, Text, Header } from 'zmp-ui'
import { khachHangAtom, tokenAtom } from '@/store/authState'
import api from '@/services/api'

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
            const { accessToken } = await authorize({
                scopes: ['profile', 'phone']
            })
            const res: any = await api.post('/auth/zalo', { accessToken })
            localStorage.setItem('token', res.data.token)
            setToken(res.data.token)
            setKhachHang(res.data.khachHang)
            navigate('/rooms')
        } catch (err) {
            console.error('Dang nhap that bai', err)
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