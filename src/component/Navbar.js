import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { FaHistory } from "react-icons/fa";
import { BiSolidPlaylist } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";

function Navbar() {
  return (
    <div className="fixed bottom-0 z-50 flex w-full items-center justify-center bg-black md:left-0 md:h-screen md:w-24 md:flex-col">
      <Link
        to={"/"}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 text-xl text-zinc-400 duration-200 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <FaUser />
        <p className="text-sm">Profile</p>
      </Link>

      <Link
        to={"/topArtist"}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 text-xl text-zinc-400 duration-200 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <PiMicrophoneStageFill />
        <p className="text-sm">Top Artist</p>
      </Link>

      <Link
        to={"/topTrack"}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 text-xl text-zinc-400 duration-200 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <FaMusic />
        <p className="text-sm">Top Tracks</p>
      </Link>

      <Link
        to={"/recent"}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 text-xl text-zinc-400 duration-200 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <FaHistory />
        <p className="text-sm">Recents</p>
      </Link>

      <Link
        to={"/playlist"}
        className="flex h-20 w-full flex-col items-center justify-center gap-1 text-xl text-zinc-400 duration-200 hover:bg-zinc-900 hover:text-zinc-50"
      >
        <BiSolidPlaylist />
        <p className="text-sm">Playlists</p>
      </Link>
    </div>
  );
}

export default Navbar;
