import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button.jsx'
import MatchScore from '../../components/items/MatchScore.jsx'
import PageContainer from '../../components/common/PageContainer.jsx'
import StatusBadge from '../../components/common/StatusBadge.jsx'
import { getSession } from '../../utils/authStorage.js'
import { getClaims, getItem, saveClaim, updateClaim } from '../../utils/storage.js'

function ItemDetailsPage() {
  const { id } = useParams()
  const item = getItem(id)
  const session = getSession()
  const [claim, setClaim] = useState(() => getClaims().find((entry) => entry.itemId === id && entry.userId === session?.id))
  const [detail, setDetail] = useState('')
  const [message, setMessage] = useState('')
  if (!item) return <Navigate to="/browse" replace />

  function submitClaim() {
    const nextClaim = { id: `claim-${Date.now()}`, itemId: item.id, userId: session?.id, userName: session?.name || 'Demo User', status: 'Claim Pending', submittedAt: new Date().toISOString(), verified: false }
    saveClaim(nextClaim)
    setClaim(nextClaim)
    setMessage('Claim submitted successfully. Verify ownership below to strengthen your claim.')
  }
  function verify() {
    if (!detail.trim()) return setMessage('Enter a private identifying detail to continue.')
    if (detail.trim().toLowerCase() === item.privateDetail.trim().toLowerCase()) {
      const verifiedClaim = updateClaim(claim.id, { verified: true, status: 'Verified' })
      setClaim(verifiedClaim)
      setMessage('Ownership Verified. Your claim is ready for admin review.')
    } else setMessage('Verification Failed. The detail does not match our private record.')
  }
  const recoveryCode = claim?.recoveryPass || (item.status === 'Recovered' && claim?.verified ? String(482731) : null)
  return <PageContainer><div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><article className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-extrabold uppercase tracking-wider text-teal">{item.type} item</p><h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">{item.title}</h1></div><StatusBadge status={item.status} /></div><dl className="mt-8 grid gap-5 border-y border-ink/10 py-6 sm:grid-cols-2"><Detail label="Category" value={item.category} /><Detail label="Color" value={item.color} /><Detail label="Location" value={item.location} /><Detail label="Date" value={item.date} /><Detail label="Report ID" value={item.id} /></dl><h2 className="mt-7 font-bold text-ink">Public description</h2><p className="mt-2 leading-7 text-ink-muted">{item.description}</p><p className="mt-6 rounded-xl bg-teal-pale p-4 text-sm text-ink-muted"><span className="font-bold text-teal">Privacy Shield:</span> Private identifying details are protected and never displayed publicly.</p></article><aside className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm"><MatchScore score={item.id.includes('wallet') ? 100 : 75} /><h2 className="mt-5 text-xl font-extrabold text-ink">Claim this item</h2>{!claim ? <><p className="mt-2 text-sm leading-6 text-ink-muted">Submit a claim, then privately verify a detail that proves ownership.</p><Button className="mt-6 w-full" onClick={submitClaim}>Claim This Item</Button></> : <><p className="mt-3 rounded-xl bg-teal-pale p-3 text-sm font-medium text-teal-dark">{message || `Claim status: ${claim.status}`}</p><label className="mt-5 block text-sm font-bold text-ink">Verify Ownership<span className="mt-1 block text-xs font-normal text-ink-muted">Provide a private detail that can help prove this item belongs to you.</span><input value={detail} onChange={(event) => setDetail(event.target.value)} disabled={claim.verified} placeholder="Identifying detail" className="mt-3 w-full rounded-xl border border-ink/15 px-3 py-3 font-normal outline-none focus:border-teal focus:ring-2 focus:ring-teal/20 disabled:bg-paper" /></label>{!claim.verified && <Button className="mt-4 w-full" onClick={verify}>Verify Ownership</Button>}{recoveryCode && <div className="mt-6 rounded-2xl bg-ink p-5 text-center text-white"><p className="text-xs font-bold tracking-widest text-teal-light">RECONNECT RECOVERY PASS</p><p className="mt-3 text-lg font-bold">{item.title}</p><p className="mt-3 text-3xl font-extrabold tracking-[0.25em]">{recoveryCode}</p><p className="mt-3 text-xs text-slate-300">Handover Approved</p></div>}</>}</aside></div></PageContainer>
}
function Detail({ label, value }) { return <div><dt className="text-xs font-bold uppercase tracking-wider text-ink-muted">{label}</dt><dd className="mt-1 font-semibold text-ink">{value}</dd></div> }
export default ItemDetailsPage
