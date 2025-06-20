import Header from '@components/Header'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className="flex flex-col flex-1">
      <header>
        <Header />
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
export default Layout
