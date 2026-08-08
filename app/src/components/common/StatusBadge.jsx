const statusStyles = {
  Searching: 'bg-blue-50 text-blue-700 ring-blue-200',
  Found: 'bg-teal-50 text-teal-dark ring-teal-100',
  'Claim Pending': 'bg-amber-50 text-amber-800 ring-amber-200',
  Verified: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Approved: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  'Handover Ready': 'bg-violet-50 text-violet-700 ring-violet-200',
  Recovered: 'bg-green-50 text-green-700 ring-green-200',
  Closed: 'bg-slate-100 text-slate-600 ring-slate-200',
}

function StatusBadge({ status = 'Searching' }) {
  const className = statusStyles[status] || statusStyles.Searching
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${className}`}>{status}</span>
}

export default StatusBadge
