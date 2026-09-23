import { describe, expect, it } from 'vitest'
import { extraireAnneesItem, pointExistePourFond } from '../src/domain/dateFilters.js'

describe('date filters', () => {
  it('extracts explicit year ranges', () => {
    expect(extraireAnneesItem({ dates: '1940 - 1944' })).toEqual({ debut: 1940, fin: 1944 })
  })

  it('extracts roman centuries', () => {
    expect(extraireAnneesItem({ dates: 'XIXe siècle' })).toEqual({ debut: 1801, fin: 1900 })
  })

  it('filters places by historical map period', () => {
    expect(pointExistePourFond({ anneeDebut: 1943 }, 'etatmajor')).toBe(false)
    expect(pointExistePourFond({ anneeDebut: 1943 }, 'ign1950')).toBe(true)
  })
})
