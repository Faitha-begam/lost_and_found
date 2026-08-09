import { useLocation } from 'react-router-dom'
import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import MatchReason from '../../components/items/MatchReason.jsx'
import MatchScore from '../../components/items/MatchScore.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { getMatchReasons, calculateMatchScore, MATCH_THRESHOLD } from '../../utils/smartMatch.js'
import { getItems } from '../../utils/storage.js'

function SmartMatchPage() {
  const location = useLocation()
  const items = getItems()
  const source = items.find((item) => item.id === location.state?.itemId) || items.find((item) => item.id === 'item-wallet-lost')
  const matches = source ? items.filter((item) => item.id !== source.id && item.type !== source.type).map((item) => ({ item, score: calculateMatchScore(source, item), reasons: getMatchReasons(source, item) })).filter((match) => match.score >= MATCH_THRESHOLD).sort((a, b) => b.score - a.score) : []
  return <PageContainer><SectionHeading eyebrow="Rule-Based SmartMatch" title="Potential matches found for your report." description="Matches are calculated from category, location, date, name, color, and public description details — not AI." /><div className="mt-8 rounded-2xl border border-teal/20 bg-teal-pale p-4 text-sm text-ink-muted">Comparing report: <span className="font-bold text-ink">{source?.title || 'your item'}</span></div>{matches.length ? <div className="mt-6 grid gap-5 lg:grid-cols-2">{matches.map(({ item, score, reasons }) => <article key={item.id} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-wider text-teal">{item.type} item</p><h2 className="mt-2 text-xl font-extrabold text-ink">{item.title}</h2><p className="mt-1 text-sm text-ink-muted">{item.location} · {item.date}</p></div><MatchScore score={score} /></div><ul className="mt-6 grid gap-1 sm:grid-cols-2">{reasons.map((reason) => <MatchReason key={reason}>{reason}</MatchReason>)}</ul><Button to={`/item/${item.id}`} className="mt-6">View Match</Button></article>)}</div> : <div className="mt-8"><EmptyState title="No close matches yet" description="Your report is saved. Check back as new found items are reported." /></div>}</PageContainer>
}

export default SmartMatchPage
