function StatCard({ label, value, helper, accent = 'teal' }) {
  const accents = { teal: 'bg-teal', amber: 'bg-amber-400', navy: 'bg-ink' }
  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-teal/25 hover:shadow-md">
      <div className={`h-1 w-10 rounded-full ${accents[accent] || accents.teal}`} />
      <p className="mt-4 text-sm font-medium text-ink-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold tracking-tight text-ink tabular-nums">{value}</p>
      {helper && <p className="mt-2 text-xs text-ink-muted">{helper}</p>}
    </article>
  )
}

export default StatCard
