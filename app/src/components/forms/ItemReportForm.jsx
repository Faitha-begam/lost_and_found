import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import { getSession } from '../../utils/authStorage.js'
import { saveItem } from '../../utils/storage.js'

const categories = ['Electronics', 'Documents', 'Bags', 'Wallets', 'Keys', 'Accessories', 'Clothing', 'Other']
const emptyForm = { title: '', category: '', color: '', location: '', date: '', description: '', privateDetail: '' }

function ItemReportForm({ type }) {
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  function submit(event) {
    event.preventDefault()
    if (isSaving) return
    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field, including the private identifying detail.')
      return
    }
    setError('')
    setIsSaving(true)
    const item = { ...form, id: `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type, status: type === 'Lost' ? 'Searching' : 'Found', reportedBy: getSession()?.id || 'user-001' }
    saveItem(item)
    window.setTimeout(() => navigate('/smart-match', { state: { itemId: item.id } }), 650)
  }

  return <form onSubmit={submit} className="rounded-3xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8"><div className="grid gap-5 sm:grid-cols-2"><Field label="Item Name" name="title" value={form.title} onChange={update} placeholder="e.g. Black Wallet" /><label className="block text-sm font-bold text-ink">Category<select name="category" value={form.category} onChange={update} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-3 font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"><option value="">Select a category</option>{categories.map((category) => <option key={category}>{category}</option>)}</select></label><Field label="Color" name="color" value={form.color} onChange={update} placeholder="e.g. Black" /><Field label="Location" name="location" value={form.location} onChange={update} placeholder="e.g. College Campus" /><label className="block text-sm font-bold text-ink">Date<input type="date" name="date" value={form.date} onChange={update} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-3 font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label></div><label className="mt-5 block text-sm font-bold text-ink">Description<textarea name="description" value={form.description} onChange={update} rows="4" placeholder="Describe public details that can help identify the item." className="mt-2 w-full resize-y rounded-xl border border-ink/15 bg-white px-3 py-3 font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label><label className="mt-5 block rounded-2xl border border-teal/20 bg-teal-pale p-4 text-sm font-bold text-ink">Private Identifying Detail<span className="mt-1 block text-xs font-normal leading-5 text-ink-muted">This stays hidden from public item cards and is used only to verify ownership.</span><textarea name="privateDetail" value={form.privateDetail} onChange={update} rows="2" placeholder="e.g. Blue college ID inside" className="mt-3 w-full resize-y rounded-xl border border-teal/20 bg-white px-3 py-3 font-normal text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20" /></label>{error && <p className="mt-4 text-sm font-semibold text-red-600">{error}</p>}<Button type="submit" className="mt-6 w-full sm:w-auto" disabled={isSaving}>{isSaving ? 'Checking for possible matches...' : `Submit ${type} Report`}</Button></form>
}

function Field({ label, name, value, onChange, placeholder }) { return <label className="block text-sm font-bold text-ink">{label}<input name={name} value={value} onChange={onChange} placeholder={placeholder} className="mt-2 w-full rounded-xl border border-ink/15 bg-white px-3 py-3 font-normal text-ink outline-none placeholder:text-ink-muted/70 focus:border-teal focus:ring-2 focus:ring-teal/20" /></label> }

export default ItemReportForm
