import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'

export function ArtistOnTerm({ artist }) {
    return (
        artist?.map(artist => (
            <div className="flex flex-col justify-center items-center m-6">
                <img
                    src={artist.images[0].url}
                    className="rounded-full w-36 h-36 object-cover duration-300 hover:scale-110 hover:cursor-pointer"
                />
                <p className="mt-3 font-semibold text-base line-clamp-1">{artist.name}</p>
            </div>
        ))
    )
}
function TopArtist() {

    // to style index Navlink : on first time load
    const location = useLocation();
    const initialActive = location.pathname === '/topArtist';

    return (
        <div className="pb-20 justify-center items-center text-zinc-200 bg-zinc-900 md:pl-24">

            <div className="flex justify-around mb-10">
                <NavLink to={'/topArtist/long_term'} className={({ isActive }) => (isActive ? 'font-bold' : `${initialActive ? "font-bold" : "text-zinc-400"}`)}>All Time</NavLink>

                <NavLink to={'/topArtist/medium_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 6 Months</NavLink>

                <NavLink to={'/topArtist/short_term'} className={({ isActive }) => (isActive ? 'font-bold' : 'text-zinc-400')}>Last 4 weeks</NavLink>
            </div>

            <div className="flex flex-wrap justify-center">
                <Outlet />
            </div>

        </div>
    )
}

export default TopArtist