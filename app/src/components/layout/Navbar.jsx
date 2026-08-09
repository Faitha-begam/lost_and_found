import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import PageContainer from '../common/PageContainer.jsx'
import { clearSession } from '../../utils/authStorage.js'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/browse', label: 'Browse Items' },
  { href: '/#how-it-works', label: 'How It Works' },
]

const userLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/browse', label: 'Browse Items' },
  { to: '/report-lost', label: 'Report Lost' },
  { to: '/smart-match', label: 'SmartMatch' },
  { to: '/my-reports', label: 'My Reports' },
  { to: '/my-claims', label: 'My Claims' },
]

function Navbar({ mode = 'public' }) {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const links = mode === 'user' ? userLinks : publicLinks

  const closeMenu = () => setIsOpen(false)
  const navLinkClass = ({ isActive }) => `rounded-lg px-2.5 py-2 text-sm font-semibold transition-colors hover:bg-teal-pale hover:text-teal ${isActive ? 'bg-teal-pale text-teal' : 'text-ink-muted'}`
  const logout = () => {
    clearSession()
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-paper/90 shadow-sm shadow-ink/5 backdrop-blur">
      <PageContainer className="flex min-h-18 items-center justify-between gap-5 py-3">
        <NavLink to="/" className="flex items-center gap-2.5" onClick={closeMenu} aria-label="ReConnect home">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-extrabold text-white">R</span>
          <span className="text-lg font-extrabold tracking-tight text-ink">Re<span className="text-teal">Connect</span></span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {links.map((link) => link.href
            ? <a key={link.label} href={link.href} className="rounded-lg px-2.5 py-2 text-sm font-semibold text-ink-muted transition-colors hover:bg-teal-pale hover:text-teal">{link.label}</a>
            : <NavLink key={link.label} to={link.to} className={navLinkClass}>{link.label}</NavLink>)}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {mode === 'public' ? <><NavLink to="/admin/login" className="text-xs font-bold text-ink-muted transition-colors hover:text-teal">Admin Login</NavLink><Button to="/login">Login</Button></> : <><NavLink to="/admin/login" className="text-xs font-bold text-ink-muted transition-colors hover:text-teal">Admin Login</NavLink><Button variant="outline" onClick={logout}>Logout</Button></>}
        </div>

        <button type="button" onClick={() => setIsOpen((open) => !open)} className="rounded-lg p-2 text-ink md:hidden" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label="Toggle navigation">
          <span className="block h-0.5 w-5 bg-current" />
          <span className="my-1 block h-0.5 w-5 bg-current" />
          <span className="block h-0.5 w-5 bg-current" />
        </button>
      </PageContainer>

      {isOpen && (
        <nav id="mobile-navigation" className="border-t border-ink/10 bg-paper px-4 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => link.href
              ? <a key={link.label} href={link.href} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-muted hover:text-teal" onClick={closeMenu}>{link.label}</a>
              : <NavLink key={link.label} to={link.to} className={`${navLinkClass} rounded-lg px-3 py-2.5`} onClick={closeMenu}>{link.label}</NavLink>)}
            {mode === 'public' ? <><NavLink to="/admin/login" className="mt-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-muted hover:text-teal" onClick={closeMenu}>Admin Login</NavLink><Button to="/login" onClick={closeMenu}>Login</Button></> : <><NavLink to="/admin/login" className="mt-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink-muted hover:text-teal" onClick={closeMenu}>Admin Login</NavLink><Button variant="outline" onClick={logout}>Logout</Button></>}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
