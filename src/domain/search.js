import { dataLieuxJustice, dataPersonnes } from './datasets.js'
import { pointExistePourFond } from './dateFilters.js'

export function rechercherPatrimoine(query, view, personId, era = 'esri') {
  const term = query.trim().toLocaleLowerCase('fr')

  if (term.length < 2) return []

  const results = []

  const personEntries =
    view === 'landing'
      ? Object.entries(dataPersonnes).filter(([id]) => id !== 'chaban_delmas')
      : view === 'map' && personId && dataPersonnes[personId]
        ? [[personId, dataPersonnes[personId]]]
        : []

  for (const [id, person] of personEntries) {
    if (`${person.nom} ${person.role}`.toLocaleLowerCase('fr').includes(term)) {
      if (view === 'landing') {
        results.push({
          key: `person-${id}`,
          type: 'person',
          id,
          label: person.nom,
          description: `Parcours • ${person.role || 'Résistance'}`,
        })
      }
    }

    person.etapes.forEach((step, index) => {
      if (!pointExistePourFond(step, era)) return

      const searchableText =
        `${step.titre} ${step.lieu} ${step.desc} ${step.date}`.toLocaleLowerCase('fr')

      if (searchableText.includes(term)) {
        results.push({
          key: `step-${id}-${index}`,
          type: 'step',
          id,
          item: step,
          label: view === 'map' ? `Étape ${index + 1} : ${step.titre}` : step.titre,
          description:
            view === 'map'
              ? `📍 ${step.lieu}${step.date ? ` • ${step.date}` : ''}`
              : `${person.nom} • ${step.date || step.lieu}`,
        })
      }
    })
  }

  if (view === 'landing' || view === 'justice' || (view === 'map' && !personId)) {
    for (const [category, group] of Object.entries(dataLieuxJustice)) {
      group.lieux.forEach((place, index) => {
        if (!pointExistePourFond(place, era)) return

        const searchableText =
          `${place.nom} ${place.adresse} ${place.role} ${place.dates || ''}`.toLocaleLowerCase('fr')

        if (searchableText.includes(term)) {
          results.push({
            key: `place-${category}-${index}`,
            type: 'place',
            category,
            item: {
              ...place,
              category,
              categoryName: group.nomCategorie,
              markerColor: group.color,
              index,
            },
            label: place.nom,
            description: `⚖️ ${group.nomCategorie}${place.dates ? ` • ${place.dates}` : ''}`,
          })
        }
      })
    }
  }

  return results.slice(0, view === 'landing' ? 10 : 8)
}
