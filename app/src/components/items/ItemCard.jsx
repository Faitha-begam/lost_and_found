import { Link } from 'react-router-dom'
import StatusBadge from '../common/StatusBadge.jsx'
import MatchScore from './MatchScore.jsx'

function ItemCard({ item }) {
  const { id, title, category, location, date, status = 'Searching', matchScore } = item

  return (
    <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-pale text-xl text-teal" aria-hidden="true">⌂</div>
        <StatusBadge status={status} />
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-muted">{category}</p>
      <h3 className="mt-1 font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted">{location} · {date}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        {matchScore !== undefined ? <MatchScore score={matchScore} /> : <span />}
        <Link to={`/item/${id}`} className="text-sm font-bold text-teal hover:text-teal-dark">View item →</Link>
      </div>
    </article>
  )
}

export default ItemCard
