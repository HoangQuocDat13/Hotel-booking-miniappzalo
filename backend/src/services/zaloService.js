import axios from 'axios'

export const layThongTinNguoiDung = async (accessToken) => {
    const res = await axios.get('https://graph.zalo.me/v2.0/me', {
        params: { fields: 'id,name,picture' },
        headers: { access_token: accessToken }
    })
    return res.data
}

export const doiCodeLayToken = async (code) => {
    const res = await axios.post('https://oauth.zaloapp.com/v4/access_token', null, {
        params: {
            app_id: process.env.ZALO_APP_ID,
            app_secret: process.env.ZALO_APP_SECRET,
            code,
            grant_type: 'authorization_code'
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
    return res.data
}