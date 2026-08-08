const icons = {
  report: <><path d="M5 3.5h10A1.5 1.5 0 0 1 16.5 5v14l-4.5-2.5L7.5 19V5A1.5 1.5 0 0 0 6 3.5Z" /><path d="M7.5 6.5h5M7.5 10h5" /></>,
  match: <><circle cx="9" cy="9" r="5.5" /><path d="m13 13 5 5M6.5 9h5M9 6.5v5" /></>,
  shield: <><path d="M12 3.5 19 6v5.1c0 4.4-2.8 7.9-7 9.4-4.2-1.5-7-5-7-9.4V6l7-2.5Z" /><path d="m8.7 12 2.1 2.1 4.6-4.6" /></>,
  pass: <><rect x="3.5" y="6" width="17" height="12" rx="2" /><path d="M7 10h5M7 14h2M16 10h1M16 14h1" /></>,
  timeline: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="18" r="2" /><path d="M8 6h5a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3h0M6 8v8a2 2 0 0 0 2 2h8" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2" /></>,
}

function LandingIcon({ name, className = '' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`h-6 w-6 ${className}`} aria-hidden="true">{icons[name]}</svg>
}

export default LandingIcon
