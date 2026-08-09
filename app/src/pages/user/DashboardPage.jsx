import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import StatCard from '../../components/dashboard/StatCard.jsx'
import ItemCard from '../../components/items/ItemCard.jsx'
import MatchReason from '../../components/items/MatchReason.jsx'
import MatchScore from '../../components/items/MatchScore.jsx'
import RecoveryTimeline from '../../components/recovery/RecoveryTimeline.jsx'
import { getSession } from '../../utils/authStorage.js'
import { confirmRecovery, getClaims, getItems, getRecoveryPasses } from '../../utils/storage.js'
import { calculateMatchScore, getMatchReasons, MATCH_THRESHOLD } from '../../utils/smartMatch.js'

function DashboardPage() {
  const [, setRefreshVersion] = useState(0)
  const session = getSession()
  const items = getItems()
  const myReports = items.filter((item) => item.reportedBy === session?.id)
  const myClaims = getClaims().filter((claim) => claim.userId === session?.id)
  const myPasses = getRecoveryPasses().filter((pass) => pass.userId === session?.id)
  const matches = findMatches(myReports, items)
  const latestClaim = myClaims[0]
  const latestPass = myPasses[0]
  const stats = [
    ['Total Reports', myReports.length, 'navy'],
    ['Lost Items', myReports.filter((item) => item.type === 'Lost').length, 'teal'],
    ['Found Items', myReports.filter((item) => item.type === 'Found').length, 'amber'],
    ['Recovered Items', myReports.filter((item) => item.status === 'Recovered').length, 'teal'],
  ]

  return <PageContainer><p className="text-sm font-bold uppercase tracking-[0.15em] text-teal">Your recovery workspace</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Welcome back, {session?.name || 'User'}</h1><p className="mt-3 text-ink-muted">Your reports, claims, and recovery progress are shown from the latest saved activity.</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><Action to="/report-lost" title="Report Lost Item" detail="Start a safe recovery search." /><Action to="/report-found" title="Report Found Item" detail="Help return an item to its owner." /><Action to="/browse" title="Browse Items" detail="Explore current reports." /></div><div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(([label, value, accent]) => <StatCard key={label} label={label} value={value} accent={accent} />)}</div><section className="mt-12"><SectionHeading eyebrow="Your reports" title="Recent reports" description="Only reports created by your account are shown here." />{myReports.length ? <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{myReports.slice(0, 3).map((item) => <ItemCard key={item.id} item={item} />)}</div> : <div className="mt-6"><EmptyState title="No reports yet" description="Create a lost or found report to begin tracking its recovery." action={<Button to="/report-lost">Report Lost Item</Button>} /></div>}</section><div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_.8fr]"><section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><SectionHeading eyebrow="Rule-Based SmartMatch" title="Potential matches" description="Calculated from your Lost reports and available Found reports." />{matches.length ? <MatchPreview match={matches[0]} /> : <div className="mt-6"><EmptyState title="No suitable matches yet" description="When a Found item closely matches one of your Lost reports, it will appear here." /></div>}</section><section className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><h2 className="text-lg font-extrabold text-ink">Recovery Journey</h2><p className="mt-2 text-sm text-ink-muted">Progress for your latest claim or Recovery Pass.</p>{latestClaim || latestPass ? <div className="mt-6"><RecoveryTimeline stages={buildStages(myReports, matches, latestClaim, latestPass)} /></div> : <div className="mt-6"><EmptyState title="No recovery journey yet" description="Submit a claim on a Found item to start a recovery journey." /></div>}</section></div><section className="mt-12"><SectionHeading eyebrow="Claims" title="My claims" description="Claim and privacy-verification information for your account." />{myClaims.length ? <div className="mt-6 grid gap-4 lg:grid-cols-2">{myClaims.map((claim) => <ClaimCard key={claim.id} claim={claim} item={items.find((item) => item.id === claim.itemId)} />)}</div> : <div className="mt-6"><EmptyState title="No claims yet" description="Claims you submit for Found items will appear here." /></div>}</section><section className="mt-12"><SectionHeading eyebrow="Recovery Passes" title="My Recovery Passes" description="Confirm your code online to complete recovery." />{myPasses.length ? <div className="mt-6 grid gap-4 lg:grid-cols-2">{myPasses.map((pass) => <RecoveryPassCard key={pass.id} pass={pass} item={items.find((item) => item.id === pass.itemId)} userId={session?.id} onConfirmed={() => setRefreshVersion((version) => version + 1)} />)}</div> : <div className="mt-6"><EmptyState title="No Recovery Passes yet" description="An approved, privacy-verified claim will receive a pass when an admin starts recovery." /></div>}</section></PageContainer>
}

function findMatches(myReports, items) {
  return myReports.filter((report) => report.type === 'Lost').flatMap((lostItem) => items.filter((item) => item.type === 'Found' && item.id !== lostItem.id).map((item) => ({ source: lostItem, item, score: calculateMatchScore(lostItem, item), reasons: getMatchReasons(lostItem, item) }))).filter((match) => match.score >= MATCH_THRESHOLD).sort((first, second) => second.score - first.score)
}

function buildStages(reports, matches, claim, pass) {
  const isRecovered = pass?.status === 'Recovered'
  const isRecoveryPending = pass?.status === 'Recovery Pending'
  const isApproved = claim?.status === 'Approved'
  return [
    { label: 'Reported', state: reports.length ? 'completed' : 'pending' },
    { label: 'Match Found', state: matches.length ? 'completed' : reports.length ? 'current' : 'pending' },
    { label: 'Claim Submitted', state: claim ? 'completed' : matches.length ? 'current' : 'pending' },
    { label: 'Privacy Verified', state: claim?.verified ? 'completed' : claim ? 'current' : 'pending' },
    { label: 'Admin Approved', state: isApproved ? 'completed' : claim?.verified ? 'current' : 'pending' },
    { label: 'Online Confirmation', state: isRecovered ? 'completed' : isRecoveryPending ? 'current' : 'pending' },
    { label: 'Recovered', state: isRecovered ? 'completed' : 'pending' },
  ]
}

function MatchPreview({ match }) {
  return <div className="mt-6 rounded-2xl bg-paper p-5"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-bold text-ink">{match.item.title}</p><p className="mt-1 text-sm text-ink-muted">{match.item.location} · {match.item.date}</p><p className="mt-2 text-xs text-ink-muted">Matched with your report: {match.source.title}</p></div><MatchScore score={match.score} /></div><ul className="mt-4 grid gap-1 sm:grid-cols-2">{match.reasons.map((reason) => <MatchReason key={reason}>{reason}</MatchReason>)}</ul><Button to={`/item/${match.item.id}`} className="mt-5">View Match</Button></div>
}

function ClaimCard({ claim, item }) {
  const verification = claim.verified ? 'Privacy Verified' : claim.verificationStatus === 'failed' ? 'Verification Failed' : 'Verification Pending'
  return <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-bold text-ink">{item?.title || 'Removed item'}</p><p className="mt-1 text-sm text-ink-muted">{item ? `${item.category} · ${item.type}` : 'The related item is unavailable'}</p></div><StatusBadge status={claim.status} /></div><p className="mt-4 text-sm text-ink-muted">{verification}</p><p className="mt-2 text-xs text-ink-muted">Claimed {formatDate(claim.createdAt || claim.submittedAt)}</p>{item && <Link to={`/item/${item.id}`} className="mt-4 inline-flex text-sm font-bold text-teal hover:text-teal-dark">View item →</Link>}</article>
}

function RecoveryPassCard({ pass, item, userId, onConfirmed }) {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  function confirm() {
    const result = confirmRecovery(pass.id, code, userId)
    setMessage(result.error || (result.completed ? 'Recovery confirmed online. Your item is now marked Recovered.' : 'This recovery was already confirmed.'))
    if (result.completed) onConfirmed()
  }
  return <article className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="font-bold text-ink">{item?.title || 'Removed item'}</p><p className="mt-1 text-xs text-ink-muted">Pass ID: {pass.id}</p></div><StatusBadge status={pass.status} /></div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-teal">Recovery code</p><p className="mt-1 font-mono text-xl font-extrabold tracking-[0.2em] text-ink">{pass.code}</p><p className="mt-3 text-xs text-ink-muted">Created {formatDate(pass.createdAt)}</p>{pass.status === 'Recovery Pending' && <div className="mt-5"><label className="block text-sm font-bold text-ink">Confirm recovery online<input value={code} onChange={(event) => { setCode(event.target.value); setMessage('') }} inputMode="numeric" placeholder="Enter your 6-digit code" className="mt-2 w-full rounded-xl border border-ink/15 px-3 py-2.5 font-mono outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label><Button className="mt-3 w-full" onClick={confirm}>Confirm Recovery Online</Button></div>}{message && <p className="mt-3 text-sm font-medium text-teal-dark">{message}</p>}{pass.recoveredAt && <p className="mt-3 text-xs font-semibold text-teal-dark">Recovered online {formatDate(pass.recoveredAt)}</p>}</article>
}

function formatDate(value) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? date.toLocaleString() : 'Not available' }
function Action({ to, title, detail }) { return <Link to={to} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal/35 hover:shadow-md"><span className="text-xs font-extrabold uppercase tracking-wider text-teal">Quick action</span><h2 className="mt-2 font-bold text-ink">{title} <span className="text-teal">→</span></h2><p className="mt-2 text-sm text-ink-muted">{detail}</p></Link> }

export default DashboardPage
