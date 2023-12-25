import React, { useContext } from 'react'
import { State } from '../state-management/Context.js'
import { NavLink, Outlet, useLocation } from 'react-router-dom'


export function TrackOnTerm({ track }) {

    const { msToMusicTime } = useContext(State)

    return (
        track?.map(track => {
            return (
                <div className="flex items-center p-3 m-0 rounded-md duration-300 cursor-pointer md:my-2 md:mx-20 hover:bg-zinc-800">

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
            )
        })
    )
}

function TopTrack() {

    // to style index Navlink : on first time load
    const location = useLocation();
    const initialActive = location.pathname === '/topTrack';

    return (
        <div className="pb-20 p-5 text-zinc-200 bg-zinc-900 md:pl-24 md:mt-0 md:pb-0">

            <div className="flex justify-around mb-10">
                <NavLink to={'/topTrack/long_term'} className={({ isActive }) => (isActive ? 'font-bold' : `${initialActive ? "font-bold" : "text-zinc-400"}`)}>All Time</NavLink>

                <NavLink to={'/topTrack/medium_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 6 Months</NavLink>

                <NavLink to={'/topTrack/short_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 4 weeks</NavLink>
            </div>

            <Outlet />

        </div>
    )
}

export default TopTrack
