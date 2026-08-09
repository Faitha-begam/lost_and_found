function storageAvailable() {
  return typeof localStorage !== 'undefined'
}

export function getData(key, fallback = null) {
  if (!storageAvailable()) return fallback

  try {
    const rawValue = localStorage.getItem(key)
    return rawValue === null ? fallback : JSON.parse(rawValue)
  } catch {
    return fallback
  }
}

export function setData(key, data) {
  if (!storageAvailable()) return data

  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Keep the UI usable if browser storage is unavailable or full.
  }

  return data
}

export function removeData(key) {
  if (!storageAvailable()) return

  try {
    localStorage.removeItem(key)
  } catch {
    // No action is needed when storage cannot be accessed.
  }
}

export function clearData(key) {
  removeData(key)
}
