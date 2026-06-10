import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import authRoutes from './modules/auth/authRoutes.js'
import roomRoutes from './modules/room/roomRoutes.js'
import bookingRoutes from './modules/booking/bookingRoutes.js'
import paymentRoutes from './modules/payment/paymentRoutes.js'
import reviewRoutes from './modules/review/reviewRoutes.js'
import promotionRoutes from './modules/promotion/promotionRoutes.js'
import adminRoutes from './modules/dashboard/dashboardRoutes.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/payments', paymentRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/promotions', promotionRoutes)
app.use('/api/admin', adminRoutes)

app.use(errorHandler)

export default app