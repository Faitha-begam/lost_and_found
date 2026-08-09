import { getData, removeData, setData } from '../services/storageService.js'
import { mockItems } from '../data/mockItems.js'

export const STORAGE_KEYS = {
  users: 'reconnect_users',
  reports: 'reconnect_items',
  claims: 'reconnect_claims',
  matches: 'reconnect_matches',
  recovery: 'reconnect_recoveries',
  recoveryPasses: 'reconnect_recovery_passes',
  adminAuth: 'reconnect_admin',

  // Existing aliases retained so current UI imports and saved data continue to work.
  items: 'reconnect_items',
  recoveries: 'reconnect_recoveries',
  admin: 'reconnect_admin',
}

export const ADMIN_CREDENTIALS = {
  email: 'admin@reconnect.com',
  password: 'admin123',
}

function normalizeReport(report) {
  const type = String(report.type || 'Lost').toLowerCase() === 'found' ? 'Found' : 'Lost'

  return {
    ...report,
    id: report.id || `report-${Date.now()}`,
    type,
    title: report.title || report.itemName || 'Untitled item',
    category: report.category || 'Other',
    description: report.description || '',
    location: report.location || '',
    date: report.date || '',
    image: report.image || null,
    status: report.status || (type === 'Found' ? 'Found' : 'Searching'),
    reportedBy: report.reportedBy || report.createdBy || null,
    createdAt: report.createdAt || new Date().toISOString(),
  }
}

export function getReports() {
  const reports = getData(STORAGE_KEYS.reports, null)
  if (Array.isArray(reports)) {
    const existingIds = new Set(reports.map((report) => report.id))
    const missingDemoReports = mockItems.filter((item) => !existingIds.has(item.id)).map((item) => normalizeReport(item))
    if (!missingDemoReports.length) return reports

    const mergedReports = [...reports, ...missingDemoReports]
    setData(STORAGE_KEYS.reports, mergedReports)
    return mergedReports
  }

  // Surface the project's existing demo reports on a fresh install without
  // overwriting any saved reports in localStorage.
  const seededReports = mockItems.map((item) => normalizeReport(item))
  setData(STORAGE_KEYS.reports, seededReports)
  return seededReports
}

export function getReportById(id) {
  return getReports().find((report) => report.id === id)
}

export function addReport(report) {
  const nextReport = normalizeReport(report)
  setData(STORAGE_KEYS.reports, [nextReport, ...getReports()])
  return nextReport
}

export function updateReport(id, updates) {
  const reports = getReports().map((report) => report.id === id ? normalizeReport({ ...report, ...updates }) : report)
  setData(STORAGE_KEYS.reports, reports)
  return reports.find((report) => report.id === id)
}

export function deleteReport(id) {
  const reports = getReports().filter((report) => report.id !== id)
  setData(STORAGE_KEYS.reports, reports)
}

// Existing item helpers now use the central report collection without changing page code.
export const getItems = getReports
export const getItem = getReportById
export const saveItem = addReport
export const updateItem = updateReport

export function getClaims() { const claims = getData(STORAGE_KEYS.claims, []); return Array.isArray(claims) ? claims : [] }
export function saveClaim(claim) { setData(STORAGE_KEYS.claims, [claim, ...getClaims()]); return claim }
export function updateClaim(id, updates) { const claims = getClaims().map((claim) => claim.id === id ? { ...claim, ...updates } : claim); setData(STORAGE_KEYS.claims, claims); return claims.find((claim) => claim.id === id) }
export function getClaimForItemAndUser(itemId, userId) { return getClaims().find((claim) => claim.itemId === itemId && claim.userId === userId) }
export function createClaim({ itemId, userId, userName }) {
  const existingClaim = getClaimForItemAndUser(itemId, userId)
  if (existingClaim) return { claim: existingClaim, created: false }

  const createdAt = new Date().toISOString()
  const claim = {
    id: `claim-${Date.now()}`,
    itemId,
    userId,
    userName,
    status: 'Claim Pending',
    verified: false,
    verificationStatus: 'pending',
    createdAt,
    submittedAt: createdAt,
  }
  saveClaim(claim)
  return { claim, created: true }
}

export function reviewClaim(claimId, decision, admin) {
  const claim = getClaims().find((entry) => entry.id === claimId)
  if (!claim || ['Approved', 'Rejected'].includes(claim.status)) return claim || null
  if (decision === 'approve' && !claim.verified) return claim

  const reviewedAt = new Date().toISOString()
  if (decision === 'approve') {
    return updateClaim(claimId, {
      status: 'Approved',
      approvedAt: reviewedAt,
      approvedBy: { id: admin?.id || 'admin-001', name: admin?.name || 'Demo Admin' },
    })
  }

  if (decision === 'reject') {
    return updateClaim(claimId, {
      status: 'Rejected',
      rejectedAt: reviewedAt,
      rejectedBy: { id: admin?.id || 'admin-001', name: admin?.name || 'Demo Admin' },
    })
  }

  return claim
}

export function getRecoveryPasses() { const passes = getData(STORAGE_KEYS.recoveryPasses, []); return Array.isArray(passes) ? passes : [] }
export function getRecoveryPassForClaim(claimId) { return getRecoveryPasses().find((pass) => pass.claimId === claimId) }

export function startRecovery(claimId, admin) {
  const claim = getClaims().find((entry) => entry.id === claimId)
  if (!claim || claim.status !== 'Approved' || !claim.verified) return { pass: null, error: 'Only approved, privacy-verified claims can start recovery.' }

  const item = getItem(claim.itemId)
  if (!item) return { pass: null, error: 'The related item is no longer available.' }
  if (item.type !== 'Found') return { pass: null, error: 'Recovery can only be started for a found item.' }

  const existingPass = getRecoveryPassForClaim(claimId)
  if (existingPass) return { pass: existingPass, created: false }

  const createdAt = new Date().toISOString()
  const pass = {
    id: `recovery-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    code: String(Math.floor(100000 + Math.random() * 900000)),
    claimId: claim.id,
    itemId: item.id,
    userId: claim.userId,
    createdAt,
    createdBy: { id: admin?.id || 'admin-001', name: admin?.name || 'Demo Admin' },
    status: 'Recovery Pending',
  }

  setData(STORAGE_KEYS.recoveryPasses, [pass, ...getRecoveryPasses()])
  updateClaim(claim.id, { recoveryPassId: pass.id, recoveryStatus: 'Recovery Pending' })
  updateItem(item.id, { status: 'Recovery Pending' })
  return { pass, created: true }
}

export function completeRecovery(recoveryPassId, admin) {
  const passes = getRecoveryPasses()
  const pass = passes.find((entry) => entry.id === recoveryPassId)
  if (!pass) return { pass: null, error: 'Recovery Pass not found.' }
  if (pass.status === 'Recovered') return { pass, completed: false }
  if (pass.status !== 'Recovery Pending') return { pass, error: 'This Recovery Pass cannot be completed.' }
  if (!getItem(pass.itemId)) return { pass, error: 'The related item is no longer available.' }

  const recoveredAt = new Date().toISOString()
  const completedPass = {
    ...pass,
    status: 'Recovered',
    recoveredAt,
    recoveredBy: { id: admin?.id || 'admin-001', name: admin?.name || 'Demo Admin' },
  }
  setData(STORAGE_KEYS.recoveryPasses, passes.map((entry) => entry.id === recoveryPassId ? completedPass : entry))
  updateClaim(pass.claimId, { recoveryStatus: 'Recovered' })
  updateItem(pass.itemId, { status: 'Recovered' })
  return { pass: completedPass, completed: true }
}

export function confirmRecovery(recoveryPassId, code, userId) {
  const pass = getRecoveryPasses().find((entry) => entry.id === recoveryPassId)
  if (!pass) return { pass: null, error: 'Recovery Pass not found.' }
  if (pass.userId !== userId) return { pass: null, error: 'This Recovery Pass belongs to another user.' }
  if (pass.status === 'Recovered') return { pass, completed: false }
  if (pass.status !== 'Recovery Pending') return { pass, error: 'This Recovery Pass cannot be confirmed yet.' }
  if (String(code || '').trim() !== pass.code) return { pass, error: 'The Recovery Pass code is incorrect.' }

  return completeRecovery(recoveryPassId, { id: userId, name: 'Verified claimant' })
}

export function getAdminSession() { return getData(STORAGE_KEYS.adminAuth, null) }
export function setAdminSession() { return setData(STORAGE_KEYS.adminAuth, { id: 'admin-001', name: 'Demo Admin' }) }
export function clearAdminSession() { removeData(STORAGE_KEYS.adminAuth) }
export function authenticateAdmin(email, password) { return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password }
