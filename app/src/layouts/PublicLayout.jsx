import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer.jsx'
import Navbar from '../components/layout/Navbar.jsx'
import { getSession } from '../utils/authStorage.js'

function PublicLayout() {
  return <div className="flex min-h-screen flex-col bg-paper"><Navbar mode={getSession() ? 'user' : 'public'} /><main className="flex-1"><Outlet /></main><Footer /></div>
}

export default PublicLayout
