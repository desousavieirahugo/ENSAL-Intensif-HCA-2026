const ROMAN_CENTURIES = {
  I: 1,
  II: 2,
  III: 3,
  IV: 4,
  V: 5,
  VI: 6,
  VII: 7,
  VIII: 8,
  IX: 9,
  X: 10,
  XI: 11,
  XII: 12,
  XIII: 13,
  XIV: 14,
  XV: 15,
  XVI: 16,
  XVII: 17,
  XVIII: 18,
  XIX: 19,
  XX: 20,
  XXI: 21,
}

export function extraireAnneesItem(item) {
  let debut = Number.isFinite(item?.anneeDebut) ? item.anneeDebut : null
  let fin = Number.isFinite(item?.anneeFin) ? item.anneeFin : null
  const date = String(item?.dates || item?.date || '')

  const years = date.match(/\b(1\d{3}|20\d{2})\b/g)?.map(Number) || []

  if (debut === null && years.length > 0) debut = Math.min(...years)

  if (fin === null && years.length > 1) fin = Math.max(...years)

  const century = date.match(/\b(\d{1,2})(?:e|ème)?\s+siècle/i)

  if (century) {
    const value = Number(century[1])

    if (debut === null) debut = (value - 1) * 100 + 1

    if (fin === null) fin = value * 100
  }

  const roman = date.match(/\b(X[IVX]*|V?I{1,3})(?:e|ème)?\s+siècle/i)

  if (roman) {
    const value = ROMAN_CENTURIES[roman[1].toUpperCase()]

    if (value) {
      if (debut === null) debut = (value - 1) * 100 + 1

      if (fin === null) fin = value * 100
    }
  }

  return { debut, fin }
}

export function pointExistePourFond(item, fondKey = 'esri') {
  if (!item) return true

  if (fondKey === 'ign1950' && item.existeEn1950 !== undefined) return Boolean(item.existeEn1950)

  if (fondKey === 'etatmajor' && item.existeEnEtatMajor !== undefined) {
    return Boolean(item.existeEnEtatMajor)
  }

  const { debut, fin } = extraireAnneesItem(item)
  const [start, end] = fondKey === 'etatmajor' ? [1820, 1866] : [1950, 1950]

  if (fondKey === 'esri') {
    return item.anneeFin == null || fin === null || fin >= 2026
  }

  return !(debut !== null && debut > end) && !(fin !== null && fin < start)
}
