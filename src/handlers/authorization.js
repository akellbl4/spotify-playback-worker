function getAuthorizationToken() {
  return btoa(`${global.SPOTIFY_CLIENT_ID}:${global.SPOTIFY_CLIENT_SECRET}`)
}

export async function handleAuthorization({ url }) {
  const redirect_uri =
    global.ENV === 'production' ? `${url.origin}/auth` : 'http://localhost:8787/auth'

  if (!url.searchParams.has('code')) {
    const query = new URLSearchParams({
      client_id: global.SPOTIFY_CLIENT_ID,
      response_type: 'code',
      redirect_uri,
      scope: 'user-read-currently-playing user-top-read',
    })

    return Response.redirect(`https://accounts.spotify.com/authorize?${query.toString()}`, 307)
  }

  return fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${getAuthorizationToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: url.searchParams.get('code'),
      redirect_uri,
    }).toString(),
  })
}

export async function getAccessToken() {
  if (!SPOTIFY_REFRESH_TOKEN) {
    throw new Error('No refresh token.')
  }

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: global.SPOTIFY_REFRESH_TOKEN,
    }).toString(),
    headers: {
      Authorization: `Basic ${getAuthorizationToken()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
  const { access_token } = await res.json()

  return access_token
}
