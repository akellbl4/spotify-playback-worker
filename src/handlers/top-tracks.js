import { getAccessToken } from './authorization'

export async function handleTopTracks() {
  const accessToken = await getAccessToken()
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  const topTracks = formatTopTracks(data)

  return Response.json(topTracks, {
    headers: {
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  })
}

function formatTopTracks({ items }) {
  return items.slice(0, 10).map(({ name, album, artists, external_urls }) => ({
    name,
    album: album.name,
    artist: artists.map(a => a.name).join(', '),
    coverUrl: album.images[0].url,
    url: external_urls.spotify,
  }))
}
