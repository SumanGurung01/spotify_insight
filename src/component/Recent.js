import React, { useContext } from 'react'
import { State } from '../state-management/Context.js'

function Recent() {

    const { recentlyPlayed, msToMusicTime } = useContext(State)
    console.log(recentlyPlayed)
    return (
        <div className="pb-20 p-5 text-zinc-200 bg-zinc-900 md:pl-24 md:mt-0 md:pb-0">
            {
                recentlyPlayed.map(track => {
                    return (
                        <div className="flex items-center p-3 m-0 rounded-md duration-300 cursor-pointer md:my-2 md:mx-20 hover:bg-zinc-800">

                            <img
                                src={track.track.album.images[0].url}
                                className="w-16 h-16 object-cover md:w-18 md:h-18"
                            />

                            <div className="flex-1 pl-4 pr-2">
                                <p className="font-semibold text-base line-clamp-1">{track.track.name}</p>
                                <p className="text-zinc-400 text-sm line-clamp-1">{track.track.artists[0].name} - {track.track.album.name}</p>
                            </div>

                            <p className="font-semibold text-zinc-400 text-sm">{msToMusicTime(track.track.duration_ms)}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Recent
