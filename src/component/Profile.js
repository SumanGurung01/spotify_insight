import React, { useContext, useEffect } from 'react'
import { State } from '../state-management/Context.js'
import { Link } from 'react-router-dom'

function Profile() {

    const { topArtist, topTrack, msToMusicTime } = useContext(State)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="text-zinc-200 bg-zinc-900 md:ml-24">

            <div>
                {/* User Details  */}
            </div>

            <div className="flex flex-col md:flex-row">

                <div className="md:w-1/2 m-5">
                    <div className="flex items-center p-2 py-8">
                        <h1 className="text-xl font-bold flex-1">Your Top 5 Artists</h1>
                        <Link className="border-2 py-2 px-6 rounded-full font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black" to='/topArtist'>SEE MORE</Link>
                    </div>
                    {
                        topArtist.long_term?.map((artist, index) => {
                            return (index < 5 ?
                                <Link to={`artist/${artist.id}`} className="flex items-center rounded-md duration-300 cursor-pointer hover:bg-zinc-800 p-2">

                                    <img
                                        src={artist.images[0].url}
                                        className="rounded-full w-16 h-16 object-cover md:w-18 md:h-18"
                                    />

                                    <p className="font-semibold text-base ml-2">{artist.name}</p>

                                </Link>
                                : null
                            )
                        })
                    }
                </div>

                <div className="md:w-1/2 m-5 mb-24 md:mb-0">
                    <div className="flex items-center p-2 py-8">
                        <h1 className="text-xl font-bold flex-1">Your Top 5 Tracks</h1>
                        <Link className="border-2 py-2 px-6 rounded-full font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black" to='/topTrack'>SEE MORE</Link>
                    </div>
                    {
                        topTrack.long_term?.map((track, index) => {
                            return (index < 5 ?
                                <Link to={`/track/${track.id}`} className="flex items-center hover:bg-zinc-800 rounded-md duration-300 cursor-pointer p-2">

                                    <img
                                        src={track.album.images[0].url}
                                        className="w-16 h-16 object-cover md:w-18 md:h-18"
                                    />

                                    <div className="flex-1 ml-2">
                                        <p className="font-semibold text-base line-clamp-1">{track.name}</p>
                                        <p className="text-zinc-400 text-sm line-clamp-1">{track.artists[0].name} - {track.album.name}</p>
                                    </div>

                                    <p className="font-semibold text-zinc-400 text-sm">{msToMusicTime(track.duration_ms)}</p>
                                </Link>
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
