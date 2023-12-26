import React, { useContext, useEffect } from 'react'
import { State } from '../state-management/Context.js'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'


export function TrackOnTerm({ track }) {

    const { msToMusicTime } = useContext(State)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        track?.map(track => {
            return (
                <Link to={`/track/${track.id}`} className="flex items-center p-2 rounded-md duration-300 cursor-pointer hover:bg-zinc-800">

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
            )
        })
    )
}

function TopTrack() {

    // to style index Navlink : on first time load
    const location = useLocation();
    const initialActive = location.pathname === '/topTrack';

    return (
        <div className="text-zinc-200 bg-zinc-900 md:ml-24">

            <div className="mx-5 pb-24 md:pb-5">

                <div className="flex gap-4 p-2 py-8 text-base items-center">

                    <h1 className="font-bold text-xl flex-1">Top Tracks</h1>

                    <NavLink to={'/topTrack/long_term'} className={({ isActive }) => (isActive ? 'font-bold underline' : `${initialActive ? "font-bold" : "text-zinc-400"}`)}>All Time</NavLink>

                    <NavLink to={'/topTrack/medium_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 6 Months</NavLink>

                    <NavLink to={'/topTrack/short_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 4 weeks</NavLink>


                </div>

                <Outlet />

            </div>
        </div>
    )
}

export default TopTrack
