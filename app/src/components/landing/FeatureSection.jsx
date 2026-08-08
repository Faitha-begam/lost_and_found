import PageContainer from '../common/PageContainer.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import LandingIcon from './LandingIcon.jsx'

const features = [
  ['match', 'SmartMatch', 'Find potential matches automatically using item details.'],
  ['shield', 'Privacy Shield', 'Keep sensitive identifying information private during matching.'],
  ['pass', 'Recovery Pass', 'Use a secure handover code after claim approval.'],
  ['timeline', 'Recovery Timeline', 'Track every stage from report to recovery.'],
]

function FeatureSection() {
  return <section className="bg-paper py-16 sm:py-24"><PageContainer><SectionHeading eyebrow="Designed for recovery" title="More than a Lost & Found board." description="Every part of ReConnect is designed around the moment an item makes it back to its owner." /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{features.map(([icon, title, description]) => <article key={title} className="group rounded-2xl border border-ink/10 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-teal/35 hover:shadow-md"><span className="grid h-12 w-12 place-items-center rounded-xl bg-ink text-teal-light transition group-hover:bg-teal group-hover:text-white"><LandingIcon name={icon} /></span><h3 className="mt-5 font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p></article>)}</div></PageContainer></section>
}

export default FeatureSection
