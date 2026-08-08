import Button from '../common/Button.jsx'
import PageContainer from '../common/PageContainer.jsx'
import { landingStats } from '../../data/landingStats.js'

export function ProblemSection() {
  return <section className="bg-white py-16 sm:py-24"><PageContainer className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><p className="text-sm font-bold uppercase tracking-[0.16em] text-teal">A better way to recover</p><div><h2 className="max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">Losing something is stressful. Finding it shouldn&apos;t be.</h2><p className="mt-5 max-w-2xl text-base leading-8 text-ink-muted">Traditional lost-and-found systems often depend on manually checking notices, posts or messages. ReConnect brings reporting, matching, verification and recovery into one clear workflow.</p></div></PageContainer></section>
}

export function StatsSection() {
  return <section className="bg-teal py-12 text-white sm:py-16"><PageContainer><div className="grid grid-cols-2 gap-y-8 divide-x divide-white/20 lg:grid-cols-4">{landingStats.map((stat) => <div key={stat.label} className="px-4 text-center first:pl-0 last:pr-0"><p className="text-3xl font-extrabold tracking-tight sm:text-4xl">{stat.value}</p><p className="mt-2 text-sm font-medium text-teal-pale">{stat.label}</p></div>)}</div></PageContainer></section>
}

export function FinalCta() {
  return <section className="bg-paper py-16 sm:py-24"><PageContainer><div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-center text-white sm:px-12 sm:py-16"><div className="absolute -left-14 top-0 h-36 w-36 rounded-full bg-teal/35 blur-3xl" aria-hidden="true" /><div className="absolute -right-12 bottom-0 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl" aria-hidden="true" /><div className="relative mx-auto max-w-2xl"><h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Lost something? Start the search.</h2><p className="mt-4 text-base leading-7 text-slate-300">Report it, discover potential matches, verify ownership, and reconnect with what matters.</p><div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><Button to="/report-lost" className="px-5 py-3">Report Lost Item</Button><Button to="/browse" variant="outline" className="border-white/25 bg-white/5 px-5 py-3 text-white hover:bg-white hover:text-ink">Browse Found Items</Button></div></div></div></PageContainer></section>
}
