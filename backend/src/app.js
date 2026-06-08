import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import authRoutes from './routes/auth.js'
import roomRoutes from './routes/rooms.js'
import bookingRoutes from './routes/bookings.js'
import paymentRoutes from './routes/payments.js'
import reviewRoutes from './routes/reviews.js'
import promotionRoutes from './routes/promotions.js'
import adminRoutes from './routes/admin.js'
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