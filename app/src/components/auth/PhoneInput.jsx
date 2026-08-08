function PhoneInput({ value, onChange, error }) {
  function handleChange(event) {
    onChange(event.target.value.replace(/\D/g, '').slice(0, 10))
  }

  return (
    <div>
      <label htmlFor="mobile-number" className="mb-2 block text-sm font-bold text-ink">Mobile Number</label>
      <div className={`flex overflow-hidden rounded-xl border bg-white transition focus-within:ring-2 focus-within:ring-teal/30 ${error ? 'border-red-400' : 'border-ink/15 focus-within:border-teal'}`}>
        <span className="flex items-center border-r border-ink/10 bg-paper px-3 text-sm font-bold text-ink-muted">+91</span>
        <input id="mobile-number" type="tel" inputMode="numeric" autoComplete="tel-national" value={value} onChange={handleChange} placeholder="98765 43210" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-ink outline-none placeholder:text-ink-muted/65" aria-invalid={Boolean(error)} aria-describedby={error ? 'mobile-error' : undefined} />
      </div>
      {error ? <p id="mobile-error" className="mt-2 text-sm font-medium text-red-600">{error}</p> : <p className="mt-2 text-xs text-ink-muted">Enter a valid 10-digit Indian mobile number.</p>}
    </div>
  )
}

export default PhoneInput
