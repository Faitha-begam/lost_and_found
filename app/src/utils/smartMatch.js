function normalized(value) { return String(value || '').trim().toLowerCase() }
function words(value) { return normalized(value).split(/[^a-z0-9]+/).filter((word) => word.length > 2) }
function similarText(a, b) { const aWords = words(a); const bWords = words(b); return aWords.some((word) => bWords.includes(word)) }

export function calculateMatchScore(lostItem, foundItem) {
  let score = 0
  if (normalized(lostItem.category) === normalized(foundItem.category)) score += 25
  if (similarText(lostItem.location, foundItem.location)) score += 20
  if (normalized(lostItem.date) === normalized(foundItem.date)) score += 15
  if (similarText(lostItem.title, foundItem.title)) score += 15
  if (normalized(lostItem.color) === normalized(foundItem.color)) score += 10
  if (similarText(lostItem.description, foundItem.description)) score += 15
  return score
}

export function getMatchReasons(lostItem, foundItem) {
  const checks = [
    [normalized(lostItem.category) === normalized(foundItem.category), 'Same category'],
    [normalized(lostItem.color) === normalized(foundItem.color), 'Same color'],
    [similarText(lostItem.location, foundItem.location), 'Similar location'],
    [normalized(lostItem.date) === normalized(foundItem.date), 'Similar date'],
    [similarText(lostItem.title, foundItem.title) || similarText(lostItem.description, foundItem.description), 'Similar description'],
  ]
  return checks.filter(([matches]) => matches).map(([, reason]) => reason)
}
