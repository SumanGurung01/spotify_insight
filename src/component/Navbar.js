import React from 'react'
import { Link } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

function Navbar() {

    const logOut = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('expireTime');
        window.location.reload()
    }

    return (
        <div className="bottom-0 fixed flex w-full z-50 justify-center items-center bg-black md:flex-col md:left-0 md:h-screen md:w-24">

            <Link to={'/'} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                <FaUser />
                <p className='text-sm'>Profile</p>
            </Link>
            <Link to={'/topArtist'} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                <PiMicrophoneStageFill />
                <p className='text-sm'>Top Artist</p>
            </Link>

            <Link to={'/topTrack'} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                < FaMusic />
                <p className='text-sm'>Top Tracks</p>
            </Link>

            <Link to={'/recent'} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                <FaHistory />
                <p className='text-sm'>Recents</p>
            </Link>

            <Link to={'/playlist'} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                <BiSolidPlaylist />
                <p className='text-sm'>Playlists</p>
            </Link>

            <Link onClick={logOut} className="flex flex-col justify-center items-center  text-zinc-400 text-xl gap-1 w-full h-20 duration-200 hover:bg-zinc-900 hover:text-zinc-50">
                <IoLogOut />
                <p className='text-sm'>Sign Out</p>
            </Link>

        </div>
    )
}

export default Navbar
