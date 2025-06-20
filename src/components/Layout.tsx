import Header from '@components/Header'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* 사이드바 */}
      <aside className="h-full"></aside>
      <main className="flex-col flex-1">
        <Header />
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
