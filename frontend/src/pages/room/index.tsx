import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Page, Text, Header, Input, Spinner } from 'zmp-ui'
import api from '@/services/api'

function RoomListPage() {
    const navigate = useNavigate()
    const [phongs, setPhongs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/rooms').then((res: any) => {
            setPhongs(res.data || [])
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return <Spinner visible />

    return (
        <Page>
            <Header title="Danh sách phòng" />
            <Box className="p-4 space-y-4">
                {phongs.map((phong: any) => (
                    <Box
                        key={phong.id}
                        className="bg-white rounded-xl shadow p-4 cursor-pointer"
                        onClick={() => navigate(`/rooms/${phong.id}`)}
                    >
                        {phong.anhPhong?.[0] && (
                            <img
                                src={phong.anhPhong[0].duongDan}
                                alt={phong.tenPhong}
                                className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                        )}
                        <Text.Title size="small">{phong.tenPhong}</Text.Title>
                        <Text className="text-gray-500 text-sm">{phong.loaiPhong?.tenLoai}</Text>
                        <Text className="text-blue-600 font-semibold mt-1">
                            {Number(phong.giaCoban).toLocaleString('vi-VN')} VND/đêm
                        </Text>
                        {phong.diemTrungBinh && (
                            <Text className="text-yellow-500 text-sm">★ {phong.diemTrungBinh.toFixed(1)}</Text>
                        )}
                    </Box>
                ))}
            </Box>
        </Page>
    )
}
export default RoomListPage