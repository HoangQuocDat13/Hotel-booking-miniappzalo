import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Page, Text, Header, Button, Spinner } from 'zmp-ui'
import api from '@/services/api'

function RoomDetailPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [phong, setPhong] = useState<any>(null)

    useEffect(() => {
        if (id) api.get(`/rooms/${id}`).then((res: any) => setPhong(res.data))
    }, [id])

    if (!phong) return <Spinner visible />

    return (
        <Page>
            <Header title={phong.tenPhong} showBackIcon />
            <Box>
                {phong.anhPhong?.map((anh: any) => (
                    <img key={anh.id} src={anh.duongDan} alt="" className="w-full h-56 object-cover" />
                ))}
                <Box className="p-4 space-y-3">
                    <Text.Title>{phong.tenPhong}</Text.Title>
                    <Text className="text-gray-500">{phong.loaiPhong?.tenLoai} · {phong.loaiPhong?.sucChua} người</Text>
                    <Text className="text-blue-600 text-lg font-bold">
                        {Number(phong.giaCoban).toLocaleString('vi-VN')} VND/đêm
                    </Text>
                    <Text className="text-gray-700">{phong.moTa}</Text>
                    <Box className="flex flex-wrap gap-2">
                        {phong.phongTienNghi?.map((pt: any) => (
                            <span key={pt.maTienNghi} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                                {pt.tienNghi.ten}
                            </span>
                        ))}
                    </Box>
                    <Button fullWidth onClick={() => navigate(`/booking?maPhong=${id}`)} size="large">
                        Đặt phòng ngay
                    </Button>
                </Box>
            </Box>
        </Page>
    )
}
export default RoomDetailPage