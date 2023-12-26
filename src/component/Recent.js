import React, { useContext, useEffect, useState } from 'react'
import { State } from '../state-management/Context.js'
import { Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";

function Recent() {

    const { accessToken, recentlyPlayed, setRecentlyPlayed, msToMusicTime } = useContext(State)
    const [isLoading, setIsLoading] = useState(recentlyPlayed.length === 0 ? true : false)

    // get user recently played
    const getRecentlyPlayed = (accessToken) => {
        fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                setRecentlyPlayed(data.items)
                setIsLoading(false)
            })
            .catch(error => console.error('Error:', error));
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        // if first time then fetch recentlyPlayed from api else use already assigned recentlyPlayed
        if (recentlyPlayed.length === 0) {
            getRecentlyPlayed(accessToken)
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
            <div className="text-zinc-200 bg-zinc-900 p-5 py-0 pb-24 md:ml-24 md:pb-5">
                <h1 className="font-bold text-xl p-2 py-8">Recently Played</h1>
                {
                    recentlyPlayed?.map(track => {
                        return (
                            <Link to={`/track/${track.track.id}`} className="flex items-center rounded-md p-2 duration-300 cursor-pointer hover:bg-zinc-800"
                                key={track.id}
                            >

                                <img
                                    src={track.track.album.images[0].url}
                                    className="w-16 h-16 object-cover md:w-18 md:h-18"
                                />

                                <div className="flex-1 ml-2">
                                    <p className="font-semibold text-base line-clamp-1">{track.track.name}</p>
                                    <p className="text-zinc-400 text-sm line-clamp-1">{track.track.artists[0].name} - {track.track.album.name}</p>
                                </div>

                                <p className="font-semibold text-zinc-400 text-sm">{msToMusicTime(track.track.duration_ms)}</p>
                            </Link>
                        )
                    })
                }
            </div>
    )
}

export default Recent
