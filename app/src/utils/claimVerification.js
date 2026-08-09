function normalizeDetail(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

export function verifyPrivateDetail(item, enteredDetail, matchingLostReports = []) {
  const claimantDetail = normalizeDetail(enteredDetail)
  const privateDetails = [item?.privateDetail, ...matchingLostReports.map((report) => report?.privateDetail)]

  return privateDetails.some((privateDetail) => {
    const storedDetail = normalizeDetail(privateDetail)

    if (!storedDetail || !claimantDetail) return false
    if (storedDetail === claimantDetail) return true

    // Permit a valid detail inside a fuller sentence or in a different word
    // order, while requiring every meaningful word from the saved detail.
    const claimantWords = new Set(claimantDetail.split(' '))
    return storedDetail.split(' ').every((word) => claimantWords.has(word))
  })
}
