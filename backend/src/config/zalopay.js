export const ZALOPAY_CONFIG = {
    app_id: process.env.ZALOPAY_APP_ID || '2553',
    key1: process.env.ZALOPAY_KEY1 || '',
    key2: process.env.ZALOPAY_KEY2 || '',
    endpoint: process.env.ZALOPAY_ENDPOINT || 'https://sb.zalopay.vn/v001/tpe/createorder'
}