import Button from '../common/Button.jsx'
import PageContainer from '../common/PageContainer.jsx'
import MatchScore from '../items/MatchScore.jsx'

function HeroFlow() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-3xl border border-ink/10 bg-white p-5 shadow-[0_24px_70px_-26px_rgba(16,42,67,0.35)] sm:p-7">
      <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-amber-300/35 blur-2xl" aria-hidden="true" />
      <div className="flex items-center justify-between"><span className="rounded-full bg-ink px-3 py-1 text-[11px] font-bold tracking-wider text-white">LOST ITEM</span><span className="text-xs font-semibold text-ink-muted">Reported today</span></div>
      <div className="mt-4 rounded-2xl border border-ink/10 bg-paper p-4"><p className="font-bold text-ink">Black Wallet</p><p className="mt-1 text-sm text-ink-muted">Near college campus</p></div>
      <div className="relative my-4 flex justify-center"><span className="h-8 border-l border-dashed border-teal" /><span className="absolute top-2 rounded-full bg-teal-pale px-3 py-1 text-[10px] font-extrabold tracking-wider text-teal">SMARTMATCH</span></div>
      <div className="rounded-2xl bg-ink p-5 text-white"><div className="flex items-center justify-between gap-4"><div><p className="text-xs font-semibold text-slate-300">Potential found item</p><p className="mt-1 font-bold">Wallet · Campus gate</p></div><MatchScore score={94} /></div><div className="mt-4 flex items-center gap-2 text-xs text-teal-light"><span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-white">✓</span> Details verified privately</div></div>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-teal"><span className="grid h-6 w-6 place-items-center rounded-full bg-teal-pale">✓</span> Ready to reconnect</div>
    </div>
  )
}

function HeroSection() {
  return (
    <section className="overflow-hidden bg-paper pb-16 pt-12 sm:pb-24 sm:pt-18">
      <PageContainer className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
        <div className="max-w-2xl"><p className="inline-flex rounded-full bg-teal-pale px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-teal">Lost &amp; Found, reimagined</p><h1 className="mt-5 text-4xl font-extrabold tracking-[-0.045em] text-ink sm:text-5xl lg:text-6xl">Lost something? <span className="text-teal">Let&apos;s reconnect it.</span></h1><p className="mt-5 max-w-xl text-base leading-8 text-ink-muted sm:text-lg">ReConnect helps people report lost belongings, discover found items, and safely verify ownership before recovery.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button to="/report-lost" className="px-5 py-3">Report Lost Item <span className="ml-2">→</span></Button><Button to="/browse" variant="outline" className="px-5 py-3">Find an Item</Button></div><p className="mt-5 text-sm font-medium text-ink-muted"><span className="mr-2 text-teal">✓</span>Built for safer, simpler campus recoveries.</p></div>
        <HeroFlow />
      </PageContainer>
    </section>
  )
}

export default HeroSection
