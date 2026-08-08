import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'

function PublicLayout() {
  return <div className="flex min-h-screen flex-col bg-paper"><Navbar /><main className="flex-1"><Outlet /></main><Footer /></div>
}

export default PublicLayout
