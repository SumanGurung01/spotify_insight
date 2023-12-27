import React, { useEffect, useContext, useState } from 'react'
import { State } from '../state-management/Context.js'
import ScaleLoader from "react-spinners/ScaleLoader";

function Playlist() {

    const { accessToken, playlist, setPlaylist } = useContext(State)

    const [isLoading, setIsLoading] = useState(playlist.length === 0 ? true : false)

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
                setIsLoading(false)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        // if first time then fetch playlist from api else use already assigned playlist
        if (playlist.length === 0) {
            getUserPlaylist(accessToken)
        }
    }, [])


    return (
        isLoading ?
            <div className="w-screen h-screen fixed flex justify-center items-center bg-zinc-900 md:pl-24">
                <ScaleLoader
                    className={`${isLoading ? null : "display:none"}`}
                    color={'#1db954'} height={80} width={10} />
            </div>
            :
            <div className="bg-zinc-900 pb-24 text-zinc-200 px-7 md:pl-24 md:pb-5">
                <h1 className="text-xl font-bold py-8 md:px-7">Your Playlists</h1>
                <div className="flex flex-wrap justify-center gap-10">
                    {playlist?.map(list => {
                        return (
                            <div className="w-72 flex flex-col gap-2 duration-500 cursor-pointer hover:underline md:w-60" key={list.id}>
                                <img
                                    className="w-72 md:w-60"
                                    src={list.images[0].url} />
                                <p className="font-bold text-lg line-clamp-1">{list.name}</p>
                                <p className="text-zinc-400 text-sm line-clamp-1 font-semibold">{list.tracks.total} Tracks</p>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}

export default Playlist
