import Button from '../common/Button.jsx'
import PageContainer from '../common/PageContainer.jsx'
import MatchReason from '../items/MatchReason.jsx'
import MatchScore from '../items/MatchScore.jsx'

function SmartMatchPreview() {
  const reasons = ['Same category', 'Same color', 'Similar location', 'Similar date', 'Similar description']
  return <section className="bg-ink py-16 text-white sm:py-24"><PageContainer className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-light">SmartMatch preview</p><h2 className="mt-3 max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">What if your lost item could find its match?</h2><p className="mt-4 max-w-xl text-base leading-7 text-slate-300">ReConnect will use clear, item-based signals to surface likely matches — never a black box.</p><div className="mt-7"><Button to="/browse" variant="primary">Explore How SmartMatch Works <span className="ml-2">→</span></Button></div></div><div className="rounded-3xl bg-white p-5 text-ink shadow-2xl sm:p-7"><div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center"><div className="rounded-2xl border border-ink/10 bg-paper p-4"><p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Your report</p><p className="mt-3 font-bold">Black Wallet</p><p className="mt-1 text-sm text-ink-muted">College Campus<br />August 8</p></div><div className="hidden text-center text-teal sm:block">→<p className="mt-1 text-[10px] font-extrabold tracking-wider">MATCH</p></div><div className="rounded-2xl bg-ink p-4 text-white"><MatchScore score={94} /><p className="mt-4 text-sm font-bold">Possible found item</p><p className="mt-1 text-xs text-slate-300">Near campus gate</p></div></div><div className="mt-5 rounded-2xl bg-teal-pale p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-teal">Why this matches</p><ul className="mt-3 grid gap-x-5 gap-y-1 sm:grid-cols-2">{reasons.map((reason) => <MatchReason key={reason}>{reason}</MatchReason>)}</ul></div></div></PageContainer></section>
}

export default SmartMatchPreview
