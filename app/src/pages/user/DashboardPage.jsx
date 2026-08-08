import { Link } from 'react-router-dom'
import Button from '../../components/common/Button.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import MatchReason from '../../components/items/MatchReason.jsx'
import MatchScore from '../../components/items/MatchScore.jsx'
import RecoveryTimeline from '../../components/recovery/RecoveryTimeline.jsx'
import { getSession } from '../../utils/authStorage.js'
import { getClaims, getItems } from '../../utils/storage.js'

function DashboardPage() {
  const session = getSession()
  const items = getItems()
  const claims = getClaims()
  const myItems = items.filter((item) => item.reportedBy === session?.id)
  const hasRecoveredItem = myItems.some((item) => item.status === 'Recovered')
  const stages = [{ label: 'Reported', state: 'completed' }, { label: 'Match Found', state: 'completed' }, { label: 'Claim', state: hasRecoveredItem ? 'completed' : 'current' }, { label: 'Verified', state: hasRecoveredItem ? 'completed' : 'pending' }, { label: 'Recovered', state: hasRecoveredItem ? 'completed' : 'pending' }]
  const wallet = items.find((item) => item.id === 'item-wallet-found')
  const stats = [
    ['My Lost Reports', myItems.filter((item) => item.type === 'Lost').length, 'teal'], ['My Found Reports', myItems.filter((item) => item.type === 'Found').length, 'navy'], ['Potential Matches', Math.max(1, myItems.length), 'amber'], ['Active Claims', claims.filter((claim) => claim.userId === session?.id && claim.status !== 'Recovered').length, 'teal'],
  ]
  return <PageContainer><p className="text-sm font-bold uppercase tracking-[0.15em] text-teal">Your recovery workspace</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Welcome back, {session?.name || 'Demo User'}</h1><p className="mt-3 text-ink-muted">Here&apos;s a clear view of your reports and recovery activity.</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><Action to="/report-lost" title="Report Lost Item" detail="Start a safe recovery search." /><Action to="/report-found" title="Report Found Item" detail="Help return an item to its owner." /><Action to="/browse" title="Browse Items" detail="Explore current reports." /></div><div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, accent]) => <StatCard key={label} label={label} value={value} accent={accent} />)}</div><div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-4"><SectionHeading eyebrow="SmartMatch preview" title="A potential match is ready" /><MatchScore score={100} /></div><div className="mt-6 rounded-2xl bg-paper p-5"><p className="font-bold text-ink">Black Wallet</p><p className="mt-1 text-sm text-ink-muted">Found at College Campus · Aug 8</p><ul className="mt-4 grid gap-1 sm:grid-cols-2">{['Same category', 'Same color', 'Similar location', 'Similar date'].map((reason) => <MatchReason key={reason}>{reason}</MatchReason>)}</ul><Button to={`/item/${wallet?.id || 'item-wallet-found'}`} className="mt-5">View Match</Button></div></section><section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold text-ink">Recovery Journey</h2><p className="mt-2 text-sm text-ink-muted">Keep track of what happens next.</p><div className="mt-6"><RecoveryTimeline stages={stages} /></div></section></div></PageContainer>
}

function Action({ to, title, detail }) { return <Link to={to} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal/35 hover:shadow-md"><span className="text-xs font-extrabold uppercase tracking-wider text-teal">Quick action</span><h2 className="mt-2 font-bold text-ink">{title} <span className="text-teal">→</span></h2><p className="mt-2 text-sm text-ink-muted">{detail}</p></Link> }

export default DashboardPage
