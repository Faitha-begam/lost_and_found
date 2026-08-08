function getMatchDetails(score) {
  if (score >= 90) return { label: 'Excellent Match', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
  if (score >= 75) return { label: 'Strong Match', className: 'bg-teal-50 text-teal-dark ring-teal-100' }
  if (score >= 60) return { label: 'Possible Match', className: 'bg-amber-50 text-amber-800 ring-amber-200' }
  return { label: 'Low Match', className: 'bg-slate-100 text-slate-600 ring-slate-200' }
}

function MatchScore({ score }) {
  const safeScore = Math.max(0, Math.min(100, Number(score) || 0))
  const details = getMatchDetails(safeScore)

  return (
    <div className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 ring-1 ring-inset ${details.className}`}>
      <span className="text-lg font-extrabold">{safeScore}%</span>
      <span className="text-xs font-bold">{details.label}</span>
    </div>
  )
}

export default MatchScore
