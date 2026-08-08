import { useMemo, useState } from 'react'
import HeroSection from '../../components/landing/HeroSection.jsx'
import HowItWorks from '../../components/landing/HowItWorks.jsx'
import FeatureSection from '../../components/landing/FeatureSection.jsx'
import SmartMatchPreview from '../../components/landing/SmartMatchPreview.jsx'
import { PrivacySection, RecoveryPreview } from '../../components/landing/PrivacyRecovery.jsx'
import { FinalCta, ProblemSection, StatsSection } from '../../components/landing/StatsAndCta.jsx'
import ItemCard from '../../components/items/ItemCard.jsx'
import EmptyState from '../../components/common/EmptyState.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import SectionHeading from '../../components/common/SectionHeading.jsx'
import { getItems } from '../../utils/storage.js'

export function HomePage() { return <><HeroSection /><ProblemSection /><HowItWorks /><FeatureSection /><SmartMatchPreview /><PrivacySection /><RecoveryPreview /><StatsSection /><FinalCta /></> }

export function BrowsePage() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [category, setCategory] = useState('All')
  const items = getItems()
  const categories = ['All', ...new Set(items.map((item) => item.category))]
  const filtered = useMemo(() => items.filter((item) => (type === 'All' || item.type === type) && (category === 'All' || item.category === category) && `${item.title} ${item.location} ${item.category}`.toLowerCase().includes(query.toLowerCase())), [items, type, category, query])
  return <PageContainer className="py-10 sm:py-14"><SectionHeading eyebrow="Community reports" title="Browse lost and found items" description="Search current reports and help reunite belongings with their owners." /><div className="mt-8 grid gap-3 rounded-2xl border border-ink/10 bg-white p-4 sm:grid-cols-[1fr_auto_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search items or locations" className="rounded-xl border border-ink/15 px-4 py-3 text-sm outline-none placeholder:text-ink-muted focus:border-teal focus:ring-2 focus:ring-teal/20" /><select value={type} onChange={(event) => setType(event.target.value)} className="rounded-xl border border-ink/15 px-3 py-3 text-sm font-semibold text-ink outline-none focus:border-teal"><option>All</option><option>Lost</option><option>Found</option></select><select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-ink/15 px-3 py-3 text-sm font-semibold text-ink outline-none focus:border-teal">{categories.map((entry) => <option key={entry}>{entry}</option>)}</select></div><p className="mt-5 text-sm text-ink-muted">{filtered.length} items shown</p>{filtered.length ? <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <ItemCard key={item.id} item={item} />)}</div> : <div className="mt-5"><EmptyState title="No reports match those filters" description="Try another item name, category, or report type." /></div>}</PageContainer>
}
