import React, { useContext, useEffect } from "react";
import { State } from "../state-management/Context.js";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export function TrackOnTerm({ track }) {
  const { msToMusicTime } = useContext(State);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return track?.map((track) => {
    return (
      <Link
        to={`/track/${track.id}`}
        className="flex cursor-pointer items-center rounded-md p-2 duration-300 hover:bg-zinc-800"
      >
        <img
          src={track.album.images[0].url}
          className="md:w-18 md:h-18 h-16 w-16 object-cover"
        />

        <div className="ml-2 flex-1">
          <p className="line-clamp-1 text-base font-semibold">{track.name}</p>
          <p className="line-clamp-1 text-sm text-zinc-400">
            {track.artists[0].name} - {track.album.name}
          </p>
        </div>

        <p className="text-sm font-semibold text-zinc-400">
          {msToMusicTime(track.duration_ms)}
        </p>
      </Link>
    );
  });
}

function TopTrack() {
  // to style index Navlink : on first time load
  const location = useLocation();
  const initialActive = location.pathname === "/topTrack";

  return (
    <div className="bg-zinc-900 text-zinc-200 md:ml-24">
      <div className="mx-5 pb-24 md:pb-5">
        <div className="flex items-center gap-4 p-2 py-8 text-base">
          <h1 className="flex-1 text-xl font-bold">Top Tracks</h1>

          <NavLink
            to={"/topTrack/long_term"}
            className={({ isActive }) =>
              isActive
                ? "font-bold underline"
                : `${initialActive ? "font-bold" : "text-zinc-400"}`
            }
          >
            All Time
          </NavLink>

          <NavLink
            to={"/topTrack/medium_term"}
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-zinc-400"
            }
          >
            Last 6 Months
          </NavLink>

          <NavLink
            to={"/topTrack/short_term"}
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-zinc-400"
            }
          >
            Last 4 weeks
          </NavLink>
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default TopTrack;
