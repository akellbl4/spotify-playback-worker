import { getAccessToken } from './authorization'

export async function handleNowPlaying() {
  const accessToken = await getAccessToken()
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  const data = await res.json()
  const track = formatTrackInfo(data)

  return Response.json(track)
}

function formatTrackInfo({ progress_ms: progress, item, is_playing: isPlaying = false }) {
  const { duration_ms: duration, name: track, artists = [], album } = item
  const artist = artists.map(({ name }) => name).join(', ')
  const cover = album.images[album.images.length - 1]
  const coverUrl = cover ? cover.url : null
  const url = external_urls.spotify

  return { progress, duration, track, artist, isPlaying, coverUrl, url }
}
