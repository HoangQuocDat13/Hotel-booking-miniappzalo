import { error } from '../utils/response.js'

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return error(res, 'Khong co quyen truy cap', 403)
    }
    next()
}

export default isAdmin