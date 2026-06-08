import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/jwt.js'
import { error } from '../utils/response.js'

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return error(res, 'Khong co token xac thuc', 401)
        }
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return error(res, 'Token khong hop le hoac het han', 401)
    }
}

export default auth