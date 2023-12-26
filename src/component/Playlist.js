import React, { useEffect, useContext } from 'react'
import { State } from '../state-management/Context.js'

function Playlist() {

    const { accessToken, playlist, setPlaylist } = useContext(State)

    // get user playlist
    const getUserPlaylist = (accessToken) => {
        fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setPlaylist(data.items)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {

        // if first time then fetch playlist from api else use already assigned playlist
        if (playlist.length === 0) {
            getUserPlaylist(accessToken)
        }
    }, [])


    return (
        <div className="bg-zinc-900 pb-24 text-zinc-200 px-7 md:pl-24 md:pb-5">
            <h1 className="text-xl font-bold py-8 md:px-7">Your Playlists</h1>
            <div className="flex flex-wrap justify-center">
                {playlist?.map(list => {
                    return (
                        <div className="flex flex-col items-center m-6" key={list.id}>
                            <img
                                className="w-60 cursor-pointer duration-300 hover:scale-110"
                                src={list.images[0].url} />
                            <p className="font-semibold text-base pt-3">{list.name}</p>
                            <p className="text-zinc-400 text-sm">{list.tracks.total} TRACKS</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Playlist
