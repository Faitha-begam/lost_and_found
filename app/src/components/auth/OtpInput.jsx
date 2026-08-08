import { useRef } from 'react'

function OtpInput({ value, onChange, error }) {
  const inputs = useRef([])
  const digits = Array.from({ length: 6 }, (_, index) => value[index] || '')

  function update(nextDigits) {
    onChange(nextDigits.join('').slice(0, 6))
  }

  function handleChange(event, index) {
    const digitsOnly = event.target.value.replace(/\D/g, '')
    if (digitsOnly.length > 1) {
      const nextDigits = digitsOnly.slice(0, 6).split('')
      update(nextDigits)
      inputs.current[Math.min(nextDigits.length, 5)]?.focus()
      return
    }
    const nextDigits = [...digits]
    nextDigits[index] = digitsOnly
    update(nextDigits)
    if (digitsOnly && index < 5) inputs.current[index + 1]?.focus()
  }

  function handleKeyDown(event, index) {
    if (event.key === 'Backspace' && !digits[index] && index > 0) inputs.current[index - 1]?.focus()
  }

  function handlePaste(event) {
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    event.preventDefault()
    update(pasted.split(''))
    inputs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return <div className="flex justify-between gap-2 sm:gap-3" onPaste={handlePaste}>{digits.map((digit, index) => <input key={index} ref={(node) => { inputs.current[index] = node }} value={digit} onChange={(event) => handleChange(event, index)} onKeyDown={(event) => handleKeyDown(event, index)} inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} maxLength={1} aria-label={`OTP digit ${index + 1}`} aria-invalid={Boolean(error)} className={`h-12 min-w-0 flex-1 rounded-xl border bg-white text-center text-xl font-extrabold text-ink outline-none transition sm:h-14 ${error ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200' : 'border-ink/15 focus:border-teal focus:ring-2 focus:ring-teal/25'}`} />)}</div>
}

export default OtpInput
