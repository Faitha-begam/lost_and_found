import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard.jsx'
import AuthVisual from '../../components/auth/AuthVisual.jsx'
import OtpInput from '../../components/auth/OtpInput.jsx'
import Button from '../../components/common/Button.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import { createOtpRecord, createSession, getOtpRecord } from '../../utils/authStorage.js'

const RESEND_DELAY = 30

function maskPhone(phone) {
  return `+91 ${phone.slice(0, 2)}•••••${phone.slice(-3)}`
}

function VerifyOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [record, setRecord] = useState(() => getOtpRecord())
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [now, setNow] = useState(Date.now())
  const secondsRemaining = useMemo(() => Math.max(0, RESEND_DELAY - Math.floor((now - (record?.sentAt || now)) / 1000)), [now, record])

  useEffect(() => {
    if (secondsRemaining === 0) return undefined
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [secondsRemaining])

  if (!record?.phone) return <Navigate to="/login" replace />

  function verifyOtp(event) {
    event.preventDefault()
    if (otp.length !== 6) {
      setError('Enter all 6 digits of your OTP.')
      return
    }
    if (otp !== record.otp) {
      setError('That code is incorrect. Check the demo OTP and try again.')
      setOtp('')
      return
    }
    setIsVerifying(true)
    window.setTimeout(() => {
      createSession(record.phone)
      navigate(location.state?.from || '/dashboard', { replace: true })
    }, 450)
  }

  function resendOtp() {
    if (secondsRemaining > 0) return
    const nextRecord = createOtpRecord(record.phone)
    setRecord(nextRecord)
    setOtp('')
    setError('')
    setNow(Date.now())
  }

  return <PageContainer className="grid min-h-screen items-center gap-10 py-8 lg:grid-cols-2 lg:py-12"><AuthVisual /><main className="mx-auto w-full max-w-md"><AuthCard><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">Secure sign-in</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Verify your number</h1><p className="mt-3 text-sm leading-6 text-ink-muted">Enter the 6-digit code sent to <span className="font-bold text-ink">{maskPhone(record.phone)}</span></p><div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3"><p className="text-xs font-bold uppercase tracking-wider text-amber-800">Demo OTP</p><p className="mt-1 text-lg font-extrabold tracking-[0.2em] text-ink">{record.otp}</p><p className="mt-1 text-xs text-amber-800">For testing only — no SMS was sent.</p></div><form className="mt-7" onSubmit={verifyOtp}><OtpInput value={otp} onChange={(value) => { setOtp(value); setError('') }} error={error} />{error && <p className="mt-3 text-sm font-medium text-red-600" role="alert">{error}</p>}<Button type="submit" className="mt-6 w-full py-3" disabled={isVerifying}>{isVerifying ? 'Verifying...' : 'Verify & Continue'}</Button></form><div className="mt-6 flex flex-col items-center gap-3 text-sm"><button type="button" onClick={resendOtp} disabled={secondsRemaining > 0} className="font-bold text-teal disabled:cursor-not-allowed disabled:text-ink-muted">{secondsRemaining > 0 ? `Resend OTP in ${secondsRemaining}s` : 'Resend OTP'}</button><button type="button" onClick={() => navigate('/login')} className="font-semibold text-ink-muted hover:text-ink">Change mobile number</button></div></AuthCard></main></PageContainer>
}

export default VerifyOtpPage
