import { mockItems } from '../data/mockItems.js'

export const STORAGE_KEYS = {
  items: 'reconnect_items',
  claims: 'reconnect_claims',
  recoveries: 'reconnect_recoveries',
  admin: 'reconnect_admin',
}

function read(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function getItems() {
  const savedItems = read(STORAGE_KEYS.items, null)
  if (savedItems) return savedItems
  return write(STORAGE_KEYS.items, mockItems)
}

export function saveItem(item) {
  const items = getItems()
  write(STORAGE_KEYS.items, [item, ...items])
  return item
}

export function updateItem(id, updates) {
  const items = getItems().map((item) => item.id === id ? { ...item, ...updates } : item)
  write(STORAGE_KEYS.items, items)
  return items.find((item) => item.id === id)
}

export function getItem(id) {
  return getItems().find((item) => item.id === id)
}

export function getClaims() { return read(STORAGE_KEYS.claims, []) }
export function saveClaim(claim) { write(STORAGE_KEYS.claims, [claim, ...getClaims()]); return claim }
export function updateClaim(id, updates) { const claims = getClaims().map((claim) => claim.id === id ? { ...claim, ...updates } : claim); write(STORAGE_KEYS.claims, claims); return claims.find((claim) => claim.id === id) }

export function getAdminSession() { return read(STORAGE_KEYS.admin, null) }
export function setAdminSession() { return write(STORAGE_KEYS.admin, { id: 'admin-001', name: 'Demo Admin' }) }
export function clearAdminSession() { localStorage.removeItem(STORAGE_KEYS.admin) }
