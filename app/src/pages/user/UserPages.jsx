import EmptyState from '../../components/common/EmptyState.jsx'
import ItemCard from '../../components/items/ItemCard.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import { getSession } from '../../utils/authStorage.js'
import { getClaims, getItems } from '../../utils/storage.js'
import PagePlaceholder from '../PagePlaceholder.jsx'

export function MyReportsPage() {
  const session = getSession()
  const reports = getItems().filter((item) => item.reportedBy === session?.id)
  return <PageContainer><SectionHeading eyebrow="Your workspace" title="My reports" description="Reports you have created stay here for easy follow-up." />{reports.length ? <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{reports.map((item) => <ItemCard key={item.id} item={item} />)}</div> : <div className="mt-8"><EmptyState title="No reports yet" description="Start by reporting a lost or found item." /></div>}</PageContainer>
}
export function MyClaimsPage() {
  const session = getSession()
  const items = getItems()
  const claims = getClaims().filter((claim) => claim.userId === session?.id)
  return <PageContainer><SectionHeading eyebrow="Your workspace" title="My claims" description="Follow each ownership claim through its verification and recovery status." /><div className="mt-8 grid gap-4">{claims.length ? claims.map((claim) => <article key={claim.id} className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-4"><div><h2 className="font-bold text-ink">{items.find((item) => item.id === claim.itemId)?.title || 'Reported item'}</h2><p className="mt-1 text-sm text-ink-muted">Verification: {claim.verified ? 'Completed' : 'Pending'}</p></div><StatusBadge status={claim.status} /></div></article>) : <EmptyState title="No claims yet" description="Claims you submit from an item detail page will appear here." />}</div></PageContainer>
}
export function RecoveryPage() { return <PagePlaceholder eyebrow="Recovery workflow" title="Recovery status" description="Your verification and handover timeline will appear here." /> }
