import React, { useEffect, useContext } from 'react'
import { State } from '../state-management/Context.js'
import { Link } from 'react-router-dom'

function Profile() {

    const { topArtist, topTrack, msToMusicTime } = useContext(State)

    return (
        <div className="text-zinc-200 bg-zinc-900 px-4 md:pl-24">

            <div className="flex flex-col md:flex-row">

                <div className="md:w-1/2 md:m-10">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold p-3 md:text-xl">Your Top 5 Artists</h1>
                        <Link className="border-2 py-2 px-6 rounded-full mx-3 font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black md:text-xs" to='/topArtist'>SEE MORE</Link>
                    </div>
                    {
                        topArtist.long_term?.map((artist, index) => {
                            return (index < 5 ?
                                <div className="flex items-center p-2 md:my-4 rounded-md duration-300 cursor-pointer hover:bg-zinc-800 mr-10">

                                    <img
                                        src={artist.images[0].url}
                                        className="rounded-full w-16 h-16 object-cover md:w-18 md:h-18"
                                    />

                                    <p className="mx-5 font-semibold text-base">{artist.name}</p>

                                </div>
                                : null
                            )
                        })
                    }
                </div>

                <div className="pb-20 mt-10 md:w-1/2 md:m-10 md:pb-0">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold p-3 md:text-xl">Your Top 5 Tracks</h1>
                        <Link className="border-2 py-2 px-6 rounded-full mx-3 font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black md:text-xs" to='/topTrack'>SEE MORE</Link>
                    </div>
                    {
                        topTrack.long_term?.map((track, index) => {
                            return (index < 5 ?
                                <div className="flex items-center p-2 md:my-4 hover:bg-zinc-800 rounded-md duration-300 cursor-pointer">

                                    <img
                                        src={track.album.images[0].url}
                                        className="w-16 h-16 object-cover md:w-18 md:h-18"
                                    />

                                    <div className="flex-1 pl-4 pr-2">
                                        <p className="font-semibold text-base line-clamp-1">{track.name}</p>
                                        <p className="text-zinc-400 text-sm line-clamp-1">{track.artists[0].name} - {track.album.name}</p>
                                    </div>

                                    <p className="font-semibold text-zinc-400 text-sm">{msToMusicTime(track.duration_ms)}</p>
                                </div>
                                : null
                            )
                        })
                    }
                </div>
            </div >
        </div >
    )
}

export default Profile
