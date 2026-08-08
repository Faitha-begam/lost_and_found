export const AUTH_SESSION_KEY = 'reconnect_session'
export const OTP_RECORD_KEY = 'reconnect_otp_record'

function readStorage(key) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  } catch {
    return null
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getSession() {
  return readStorage(AUTH_SESSION_KEY)
}

export function clearSession() {
  localStorage.removeItem(AUTH_SESSION_KEY)
}

export function getOtpRecord() {
  return readStorage(OTP_RECORD_KEY)
}

export function createOtpRecord(phone) {
  const otp = String(Math.floor(100000 + Math.random() * 900000))
  const record = { phone, otp, sentAt: Date.now() }
  writeStorage(OTP_RECORD_KEY, record)
  return record
}

export function clearOtpRecord() {
  localStorage.removeItem(OTP_RECORD_KEY)
}

export function createSession(phone) {
  const session = {
    id: 'user-001',
    name: 'Demo User',
    phone,
    trustScore: 100,
    successfulRecoveries: 0,
  }
  writeStorage(AUTH_SESSION_KEY, session)
  clearOtpRecord()
  return session
}
