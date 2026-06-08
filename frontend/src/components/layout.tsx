import { getSystemInfo } from 'zmp-sdk'
import { AnimationRoutes, App, Route, SnackbarProvider, ZMPRouter } from 'zmp-ui'
import { AppProps } from 'zmp-ui/app'
import HomePage from '@/pages/home/index'
import RoomListPage from '@/pages/room/index'
import RoomDetailPage from '@/pages/room/[id]'
import BookingPage from '@/pages/booking/index'
import ProfilePage from '@/pages/profile/index'

const Layout = () => {
  return (
    <App theme={getSystemInfo().zaloTheme as AppProps['theme']}>
      <SnackbarProvider>
        <ZMPRouter>
          <AnimationRoutes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </AnimationRoutes>
        </ZMPRouter>
      </SnackbarProvider>
    </App>
  )
}
export default Layout