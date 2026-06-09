import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAtom } from 'jotai'
import { Box, Page, Text, Header, Button, Avatar } from 'zmp-ui'
import { khachHangAtom } from '@/store/authState'
import api from '@/services/api'

function ProfilePage() {
    const navigate = useNavigate()
    const [khachHang, setKhachHang] = useAtom(khachHangAtom)

    useEffect(() => {
        api.get('/auth/me').then((res: any) => setKhachHang(res.data))
    }, [])

    const handleDangXuat = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Page>
            <Header title="Tài khoản" />
            <Box className="p-4 space-y-4">
                <Box className="flex items-center space-x-4 bg-white rounded-xl p-4">
                    <Avatar src={khachHang?.anhDaiDien} size={56} />
                    <Box>
                        <Text.Title size="small">{khachHang?.hoTen}</Text.Title>
                        <Text className="text-gray-500 text-sm">{khachHang?.email || 'Chưa có email'}</Text>
                    </Box>
                </Box>
                <Box className="bg-white rounded-xl overflow-hidden">
                    <Box
                        className="flex items-center p-4 border-b cursor-pointer"
                        onClick={() => navigate('/profile/history')}
                    >
                        <Text>📋 Lịch sử đặt phòng</Text>
                    </Box>
                    <Box className="flex items-center p-4 cursor-pointer" onClick={() => navigate('/profile/wishlist')}>
                        <Text>❤️ Phòng yêu thích</Text>
                    </Box>
                </Box>
                <Button fullWidth variant="secondary" onClick={handleDangXuat}>
                    Đăng xuất
                </Button>
            </Box>
        </Page>
    )
}
export default ProfilePage