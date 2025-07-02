import Header from '@components/layout/Header'
import { menuData } from '@constants/layout/sidebar/menuData'
import SideBarMenu from '@components/layout/sidebar/SideBarMenu'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBarMenu menuData={menuData} />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 bg-[#f9f9f9] px-6 py-12">
          <div className="flex flex-col bg-white">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
export default Layout
