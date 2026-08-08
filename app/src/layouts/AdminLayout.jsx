import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import PageContainer from '../components/common/PageContainer.jsx'
import { clearAdminSession } from '../utils/storage.js'

const adminLinks = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/claims', label: 'Claims' },
  { to: '/admin/recovery', label: 'Recovery' },
]

function AdminLayout() {
  const navigate = useNavigate()
  function logout() { clearAdminSession(); navigate('/admin/login') }
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-ink/10 bg-ink text-white"><PageContainer className="flex min-h-16 items-center justify-between gap-4"><NavLink to="/admin" className="font-extrabold">Re<span className="text-teal-light">Connect</span> <span className="ml-1 text-xs font-medium text-slate-300">Admin</span></NavLink><div className="flex items-center gap-4"><NavLink to="/" className="text-sm font-semibold text-slate-300 hover:text-white">User site</NavLink><button type="button" onClick={logout} className="text-sm font-semibold text-slate-300 hover:text-white">Logout</button></div></PageContainer></header>
      <PageContainer className="py-8 sm:py-10"><nav className="mb-8 flex gap-2 overflow-x-auto pb-1" aria-label="Admin navigation">{adminLinks.map((link) => <NavLink key={link.label} {...link} className={({ isActive }) => `shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${isActive ? 'bg-teal text-white' : 'bg-white text-ink-muted ring-1 ring-ink/10 hover:text-ink'}`}>{link.label}</NavLink>)}</nav><main><Outlet /></main></PageContainer>
    </div>
  )
}

export default AdminLayout
