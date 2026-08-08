import PageContainer from '../common/PageContainer.jsx'
import SectionHeading from '../common/SectionHeading.jsx'
import RecoveryTimeline from '../recovery/RecoveryTimeline.jsx'
import LandingIcon from './LandingIcon.jsx'

const recoveryStages = [
  { label: 'Reported', state: 'completed' }, { label: 'Match Found', state: 'completed' }, { label: 'Claim Verified', state: 'completed' }, { label: 'Admin Approved', state: 'completed' }, { label: 'Handover', state: 'current' }, { label: 'Recovered', state: 'pending' },
]

export function PrivacySection() {
  return <section className="bg-white py-16 sm:py-24"><PageContainer className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18"><div><SectionHeading eyebrow="Privacy Shield" title="Your item details stay yours." description="Some identifying information is too sensitive to publish publicly. ReConnect keeps private details hidden and uses them only during ownership verification." /><div className="mt-8 max-w-md rounded-2xl border border-ink/10 bg-paper p-5"><div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-pale text-teal"><LandingIcon name="shield" /></span><p className="text-sm font-bold text-ink">Only the right details, at the right time.</p></div></div></div><div className="mx-auto w-full max-w-md space-y-4"><div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-sm"><p className="text-xs font-extrabold tracking-wider text-teal">PUBLIC</p><p className="mt-3 font-bold text-ink">Black Wallet</p><p className="mt-1 text-sm text-ink-muted">Found near campus</p></div><div className="ml-6 rounded-2xl border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2 text-amber-800"><LandingIcon name="lock" className="h-5 w-5" /><p className="text-xs font-extrabold tracking-wider">PRIVATE</p></div><p className="mt-3 font-bold text-ink">Contains blue college ID</p><p className="mt-1 text-xs text-amber-800">Visible only during verification</p></div></div></PageContainer></section>
}

export function RecoveryPreview() {
  return <section className="bg-paper py-16 sm:py-24"><PageContainer className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-18"><div className="order-2 lg:order-1 mx-auto w-full max-w-sm rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><RecoveryTimeline stages={recoveryStages} /></div><div className="order-1 lg:order-2"><SectionHeading eyebrow="Recovery timeline" title="Every recovery has a story." description="From the first report to the final handover, ReConnect makes recovery progress clear and easy to follow." /><p className="mt-6 border-l-2 border-teal pl-4 text-sm leading-6 text-ink-muted">A shared, simple view helps everyone know what happens next — without exposing private ownership details.</p></div></PageContainer></section>
}
