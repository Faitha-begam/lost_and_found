import PageContainer from '../common/PageContainer.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import LandingIcon from './LandingIcon.jsx'

const steps = [
  ['01', 'report', 'Report', 'Tell us what you lost or found.'],
  ['02', 'match', 'SmartMatch', 'ReConnect compares reports and identifies potential matches.'],
  ['03', 'shield', 'Verify', 'Ownership is verified privately without exposing sensitive details.'],
  ['04', 'pass', 'Reconnect', 'Admin-approved users receive a Recovery Pass for safe handover.'],
]

function HowItWorks() {
  return <section id="how-it-works" className="scroll-mt-20 bg-white py-16 sm:py-24"><PageContainer><SectionHeading eyebrow="The recovery workflow" title="From Lost to Reconnected" description="A clear, privacy-first path from the first report to a safe handover." align="center" /><div className="relative mt-12 grid gap-5 md:grid-cols-4 md:gap-4"><div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-ink/10 md:block" aria-hidden="true" />{steps.map(([number, icon, title, description]) => <article key={number} className="relative rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><span className="grid h-16 w-16 place-items-center rounded-2xl bg-teal-pale text-teal"><LandingIcon name={icon} /></span><span className="text-sm font-extrabold text-amber-500">{number}</span></div><h3 className="mt-5 font-bold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-ink-muted">{description}</p></article>)}</div></PageContainer></section>
}

export default HowItWorks
