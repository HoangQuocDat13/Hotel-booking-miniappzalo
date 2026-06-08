export const tinhSoDem = (ngayCheckin, ngayCheckout) => {
    const checkin = new Date(ngayCheckin)
    const checkout = new Date(ngayCheckout)
    const diff = checkout.getTime() - checkin.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export const taoMaBooking = () => {
    return 'BK' + Date.now() + Math.random().toString(36).substring(2, 6).toUpperCase()
}