# Spotify API for your playback

- `/now-playing` – returns current state of playback in your Spotify
- `/top-tracks` - return your top-10 tracks

Requirements:
`node >= v14.16.0`
`yarn >= 1.22.10`

## Deploy Clouduflare Worker

- Run `yarn` in folder with the project to get dependencies installed
- Run `yarn auth` and authorize on Cloudflare
- Run `yarn deploy` for deploying the worker
- Open [Cloudflare](https://dash.cloudflare.com/) Workers page in the browser
- Create a new application at [Spotify Developers](https://developer.spotify.com/dashboard/applications) interface or use an existing
- Open settings and add address to auth endpoint to **Redirect URIs**. The URL should be looks like `%domain/auth`. Example `https://spotify-worker.0050004d.workers.dev/auth`
- Add your Spotify **Client ID** to environment variables for the deployed worker as `SPOTIFY_CLIENT_ID`
- Add your Spotify **Client Secret** to environment variables for the deployed worker as `SPOTIFY_CLIENT_SECRET` with encryption
- Edit `ENV` variable and set it to `production`
- Find domain of your worker (it'll be shown with message `Deployed to %domain` on the worker page)
- Go by your worker address in the browser. Example: `https://spotify-worker.0050004d.workers.dev`
- Go through the authorization process. After authorization you'll be redirected to page with JSON
- Copy `refresh_token` and it to environment variables as `SPOTIFY_REFRESH_TOKEN` with encryption

Finally you can open `%domain/now-playing` or `%domain/top-tracks`. For example https://spotify-worker.0050004d.workers.dev/now-playing or https://spotify-worker.0050004d.workers.dev/top/tracks

## Run Development

**Install Dependencies**

- Run `yarn` in folder with the project to get dependencies installed
- You can create a new application at [Spotify Developers](https://developer.spotify.com/dashboard/applications) interface or use an existing
- In settings of your Spotify App add `http://localhost:8787/auth` to **Redirect URIs**
- Add your Spotify Client ID to `wrangler.toml`
- Add Spotify Client Secret to secrets with:
  `wrangler secrets set SPOTIFY_CLIENT_SECRET`
- Open `http://localhost:8787/auth`
- Go through the authorization process. After authorization you'll be redirected to page with JSON
- Copy `refresh_token` and set it as a secret `wrangler secrets set SPOTIFY_REFRESH_TOKEN`
