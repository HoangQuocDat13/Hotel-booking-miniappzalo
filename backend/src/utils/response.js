export const success = (res, data, message = 'Thanh cong', statusCode = 200) => {
    return res.status(statusCode).json({ success: true, message, data })
}

export const error = (res, message = 'Co loi xay ra', statusCode = 500, errors = null) => {
    return res.status(statusCode).json({ success: false, message, errors })
}