import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'

function UserLayout() {
  return <div className="flex min-h-screen flex-col bg-paper"><Navbar mode="user" /><main className="flex-1 py-8 sm:py-10"><Outlet /></main><Footer /></div>
}

export default UserLayout
