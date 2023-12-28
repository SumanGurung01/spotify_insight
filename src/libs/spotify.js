const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URI = "https://spotify-insight.vercel.app/"
const CLIENT_ID = "f939fe844d8d42d782ad3516cbb80937"

const allScopes = ["user-top-read", "user-read-recently-played", "user-follow-read"]

const scopeString = allScopes.join("%20")

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scopeString}&response_type=token&show_dialog=true`

export const getAccessToken = () => {
    return window.location.hash.split('&')[0].split('=')[1]
}
