export const MATCH_THRESHOLD = 50

function normalized(value) {
  return String(value || '').trim().toLowerCase()
}

function words(value) {
  return normalized(value).split(/[^a-z0-9]+/).filter((word) => word.length > 2)
}

function textSimilarity(firstValue, secondValue) {
  const first = words(firstValue)
  const second = words(secondValue)
  if (!first.length || !second.length) return 0
  if (normalized(firstValue) === normalized(secondValue)) return 1

  const sharedWords = first.filter((word) => second.includes(word)).length
  return sharedWords / Math.max(first.length, second.length)
}

function dateSimilarity(firstDate, secondDate) {
  const first = Date.parse(firstDate)
  const second = Date.parse(secondDate)
  if (Number.isNaN(first) || Number.isNaN(second)) return 0

  const daysApart = Math.abs(first - second) / (1000 * 60 * 60 * 24)
  if (daysApart <= 1) return 1
  if (daysApart <= 3) return 0.75
  if (daysApart <= 7) return 0.5
  if (daysApart <= 14) return 0.25
  return 0
}

function compareItems(lostItem, foundItem) {
  const categoryMatch = normalized(lostItem.category) === normalized(foundItem.category)
  const titleSimilarity = textSimilarity(lostItem.title, foundItem.title)
  const colorMatch = normalized(lostItem.color) === normalized(foundItem.color)
  const locationSimilarity = textSimilarity(lostItem.location, foundItem.location)
  const dateScore = dateSimilarity(lostItem.date, foundItem.date)
  const descriptionSimilarity = textSimilarity(lostItem.description, foundItem.description)

  return { categoryMatch, titleSimilarity, colorMatch, locationSimilarity, dateScore, descriptionSimilarity }
}

export function calculateMatchScore(lostItem, foundItem) {
  const details = compareItems(lostItem, foundItem)
  let score = 0

  if (details.categoryMatch) score += 30
  score += details.titleSimilarity * 20
  if (details.colorMatch) score += 10
  score += details.locationSimilarity * 20
  score += details.dateScore * 15
  score += details.descriptionSimilarity * 5

  // Different categories should never appear as a convincing match.
  if (!details.categoryMatch) score = Math.min(score, 35)

  return Math.round(Math.max(0, Math.min(100, score)))
}

export function getMatchReasons(lostItem, foundItem) {
  const details = compareItems(lostItem, foundItem)
  const reasons = []

  if (details.categoryMatch) reasons.push('Same category')
  if (details.titleSimilarity === 1) reasons.push('Same item name')
  else if (details.titleSimilarity >= 0.5) reasons.push('Similar item name')
  if (details.colorMatch) reasons.push('Same color')
  if (details.locationSimilarity === 1) reasons.push('Same location')
  else if (details.locationSimilarity >= 0.5) reasons.push('Nearby location')
  if (details.dateScore === 1) reasons.push('Same date')
  else if (details.dateScore > 0) reasons.push('Reported around the same time')
  if (details.descriptionSimilarity >= 0.4) reasons.push('Similar public description')

  return reasons
}
