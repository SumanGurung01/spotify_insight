import React, { useContext } from 'react'
import { State } from '../state-management/Context.js'

function Playlist() {
    const { playlist } = useContext(State)

    const logOut = () => {
        localStorage.removeItem('accessToken');
        window.location.pathname = '/'
    }

    return (
        <div className="bg-zinc-900 text-zinc-200 pt-10 md:pl-24">
            <h1 className="text-2xl font-bold text-center mb-8">Your Playlists</h1>
            <div className="flex flex-wrap justify-center pb-20">
                {playlist.map(list => {
                    return (
                        <div className="flex flex-col items-center m-5">
                            <img
                                className="w-60"
                                src={list.images[0].url} />
                            <p className="font-semibold text-base mt-4">{list.name}</p>
                            <p className="text-zinc-400 text-sm">{list.tracks.total} TRACKS</p>
                        </div>
                    )
                })}
            </div>
            <button onClick={logOut}>Log Out</button>
        </div>
    )
}

export default Playlist
