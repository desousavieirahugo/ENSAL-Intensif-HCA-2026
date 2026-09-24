export const MAX_GPS_POINTS_DESKTOP = 11

export const MAX_GPS_POINTS_MOBILE = 5

export function createGpsUrl(items, isApple, maxPoints) {
  const points = items
    .map(item => item.coords)
    .filter(Boolean)
    .slice(0, maxPoints)

  if (!points.length) return null

  if (points.length === 1) {
    const [lat, lng] = points[0]

    return isApple
      ? `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=w`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=walking`
  }

  const [originLat, originLng] = points[0]
  const [destinationLat, destinationLng] = points.at(-1)

  const waypoints = points
    .slice(1, -1)
    .map(point => point.join(','))
    .join('|')

  return isApple
    ? `https://maps.apple.com/?saddr=${originLat},${originLng}&daddr=${points
        .slice(1)
        .map(point => point.join(','))
        .join('+to:')}&dirflg=w`
    : `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destinationLat},${destinationLng}${waypoints ? `&waypoints=${encodeURIComponent(waypoints)}` : ''}&travelmode=walking`
}
