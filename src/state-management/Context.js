import React, { createContext, useState } from 'react'

export const State = createContext();

function Context({ children }) {

    const getTokenFromSessionStorage = () => {
        // first time login
        if (sessionStorage.getItem('accessToken') === null) return null

        const expireTime = sessionStorage.getItem('expireTime')

        // if token expired
        if (expireTime <= Math.floor(new Date().getTime() / 1000)) {
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('expireTime')
            return null
        } else {
            return sessionStorage.getItem('accessToken')
        }
    }

    const [accessToken, setAccessToken] = useState(getTokenFromSessionStorage())

    const [user, setUser] = useState({})
    const [topArtist, setTopArtist] = useState({})
    const [topTrack, setTopTrack] = useState({})
    const [playlist, setPlaylist] = useState([])
    const [recentlyPlayed, setRecentlyPlayed] = useState([])
    const [track, setTrack] = useState({})
    const [artist, setArtist] = useState({})
    const [singlePlaylist, setSinglePlaylist] = useState({})


    function msToMusicTime(time) {

        var sec = Math.floor(time / 1000)
        var minute = Math.floor(sec / 60)
        var remSecond = sec % 60

        minute = minute.toString()
        if (remSecond < 10) {
            remSecond = '0' + remSecond.toString()
        } else {
            remSecond = remSecond.toString()
        }
        return `${minute}:${remSecond}`
    }


    return (
        <State.Provider
            value={{ accessToken, setAccessToken, user, setUser, topArtist, setTopArtist, topTrack, setTopTrack, playlist, setPlaylist, msToMusicTime, recentlyPlayed, setRecentlyPlayed, track, setTrack, artist, setArtist, singlePlaylist, setSinglePlaylist }}
        >
            {children}
        </State.Provider>
    )
}

export default Context
