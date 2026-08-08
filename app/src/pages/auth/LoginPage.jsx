import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthCard from '../../components/auth/AuthCard.jsx'
import AuthVisual from '../../components/auth/AuthVisual.jsx'
import PhoneInput from '../../components/auth/PhoneInput.jsx'
import Button from '../../components/common/Button.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import { createOtpRecord, getOtpRecord } from '../../utils/authStorage.js'

function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [phone, setPhone] = useState(() => getOtpRecord()?.phone || '')
  const [error, setError] = useState('')
  const [isSending, setIsSending] = useState(false)

  function sendOtp(event) {
    event.preventDefault()
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    setError('')
    setIsSending(true)
    window.setTimeout(() => {
      createOtpRecord(phone)
      navigate('/verify-otp', { state: { from: location.state?.from } })
    }, 500)
  }

  return <PageContainer className="grid min-h-screen items-center gap-10 py-8 lg:grid-cols-2 lg:py-12"><AuthVisual /><main className="mx-auto w-full max-w-md"><AuthCard><p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">Frontend prototype</p><h1 className="mt-3 text-3xl font-extrabold tracking-tight text-ink">Welcome to ReConnect</h1><p className="mt-3 text-sm leading-6 text-ink-muted">Enter your mobile number to continue.</p><form className="mt-8" onSubmit={sendOtp} noValidate><PhoneInput value={phone} onChange={(value) => { setPhone(value); setError('') }} error={error} /><Button type="submit" className="mt-6 w-full py-3" disabled={isSending}>{isSending ? 'Sending OTP...' : 'Send OTP'}</Button></form><p className="mt-5 text-center text-xs leading-5 text-ink-muted">This is a frontend-only demo. No SMS will be sent to your phone.</p></AuthCard></main></PageContainer>
}

export default LoginPage
