import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard.jsx'
import AuthVisual from '../../components/auth/AuthVisual.jsx'
import Button from '../../components/common/Button.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import { authenticateAdmin, getAdminSession, setAdminSession } from '../../utils/storage.js'

function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  function submit(event) { event.preventDefault(); if (authenticateAdmin(email, password)) { setAdminSession(); navigate('/admin') } else setError('The email or password is incorrect.') }
  if (getAdminSession()) return <Navigate to="/admin" replace />
  return <PageContainer className="grid min-h-screen items-center gap-10 py-8 lg:grid-cols-2 lg:py-12"><AuthVisual /><main className="mx-auto w-full max-w-md"><AuthCard><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">Demo administration</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Admin login</h1><p className="mt-3 text-sm text-ink-muted">Sign in to review the platform&apos;s reports and recovery activity.</p><div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"><p className="font-bold">Development credentials</p><p className="mt-1">admin@reconnect.com · admin123</p></div><form className="mt-7 space-y-5" onSubmit={submit}><Field label="Email" value={email} onChange={setEmail} type="email" /><Field label="Password" value={password} onChange={setPassword} type="password" />{error && <p className="text-sm font-semibold text-red-600" role="alert">{error}</p>}<Button type="submit" className="w-full">Sign in as Admin</Button></form><p className="mt-6 text-center text-xs leading-5 text-ink-muted">Frontend demo authentication only.</p></AuthCard></main></PageContainer>
}
function Field({ label, value, onChange, type }) { return <label className="block text-sm font-bold text-ink">{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-xl border border-ink/15 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label> }
export default AdminLoginPage
