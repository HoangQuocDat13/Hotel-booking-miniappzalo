import 'dotenv/config'
import app from './src/app.js'
import { khoiDongCronJob } from './src/services/cronService.js'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server dang chay tai port ${PORT}`)
    khoiDongCronJob()
})