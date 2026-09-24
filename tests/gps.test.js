import { describe, expect, it } from 'vitest'
import { createGpsUrl, MAX_GPS_POINTS_DESKTOP, MAX_GPS_POINTS_MOBILE } from '../src/domain/gps.js'

describe('gPS route links', () => {
  it('returns no link if there are no coordinates', () => {
    expect(createGpsUrl([{ coords: null }], false, MAX_GPS_POINTS_DESKTOP)).toBeNull()
  })

  it('opens a walking route to a single point', () => {
    expect(createGpsUrl([{ coords: [45, 4] }], false, MAX_GPS_POINTS_MOBILE)).toContain(
      'destination=45,4',
    )
  })

  it('uses the first eleven stops in order instead of skipping the middle', () => {
    const items = Array.from({ length: 14 }, (_, index) => ({ coords: [45, index] }))
    const url = new URL(createGpsUrl(items, false, MAX_GPS_POINTS_DESKTOP))

    expect(MAX_GPS_POINTS_DESKTOP).toBe(11)
    expect(url.searchParams.get('origin')).toBe('45,0')
    expect(url.searchParams.get('destination')).toBe('45,10')
    expect(url.searchParams.get('waypoints').split('|')).toEqual(
      Array.from({ length: 9 }, (_, index) => `45,${index + 1}`),
    )
  })

  it('limits mobile browsers to three intermediary stops', () => {
    const items = Array.from({ length: 14 }, (_, index) => ({ coords: [45, index] }))
    const url = new URL(createGpsUrl(items, false, MAX_GPS_POINTS_MOBILE))

    expect(url.searchParams.get('destination')).toBe('45,4')
    expect(url.searchParams.get('waypoints').split('|')).toEqual(['45,1', '45,2', '45,3'])
  })

  it('keeps the same stop limit on Apple Maps', () => {
    const items = Array.from({ length: 14 }, (_, index) => ({ coords: [45, index] }))
    const url = createGpsUrl(items, true, MAX_GPS_POINTS_DESKTOP)

    expect(url).toContain('daddr=45,1+to:45,2')
    expect(url).toContain('45,10')
    expect(url).not.toContain('45,11')
  })
})
