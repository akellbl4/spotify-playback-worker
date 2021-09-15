import { handleAuthorization } from './handlers/authorization'
import { handleNowPlaying } from './handlers/now-playing'
import { handleTopTracks } from './handlers/top-tracks'

Response.json = (data, init = {}) => {
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      ...init.headers,
    },
    ...init,
  })
}

Response.html = (body, init = {}) => {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/html',
      ...init.headers,
    },
    ...init,
  })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const ctx = { req: request, url }

  switch (true) {
    case url.pathname.endsWith('/auth'): {
      return await handleAuthorization(ctx)
    }
    case url.pathname.endsWith('/now-playing'): {
      return await handleNowPlaying(ctx)
    }
    case url.pathname.endsWith('/top-tracks'): {
      return await handleTopTracks(ctx)
    }
    default: {
      if (!global.SPOTIFY_CLIENT_ID) {
        return Response.html(
          `Please set <pre style="display:inline">SPOTIFY_CLIENT_ID</pre> in worker environment`
        )
      }
      if (!global.SPOTIFY_CLIENT_SECRET) {
        return Response.html(
          `Please set <pre style="display:inline">SPOTIFY_CLIENT_SECRET</pre> in worker environment`
        )
      }
      if (!global.SPOTIFY_REFRESH_TOKEN) {
        return Response.redirect(`${url.origin}/auth`)
      }

      return Response.html(
        `<a href="/top-tracks">Top Tracks</a><br><a href="/now-playing"/> Now Playing</a>`
      )
    }
  }
}
