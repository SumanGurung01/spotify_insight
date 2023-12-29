import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation, Link } from "react-router-dom";

export function ArtistOnTerm({ artist }) {
  return artist?.map((artist) => (
    <Link
      to={`/artist/${artist.id}`}
      className="m-6 flex flex-col items-center justify-center"
    >
      <img
        src={artist.images[0].url}
        className="h-32 w-32 rounded-full object-cover duration-300 hover:scale-110 hover:cursor-pointer md:h-36 md:w-36"
      />

      <p className="mt-3 line-clamp-1 text-base font-semibold">{artist.name}</p>
    </Link>
  ));
}

function TopArtist() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // to style index Navlink : on first time load
  const location = useLocation();
  const initialActive = location.pathname === "/topArtist";

  return (
    <div className="bg-zinc-900 text-zinc-200 md:ml-24">
      <div className="mx-5 pb-24 md:pb-5">
        <div className="flex items-center gap-4 p-2 py-8 text-base">
          <h1 className="flex-1 text-xl font-bold">Top Artists</h1>

          <NavLink
            to={"/topArtist/long_term"}
            className={({ isActive }) =>
              isActive
                ? "font-bold"
                : `${initialActive ? "font-bold" : "text-zinc-400"}`
            }
          >
            All Time
          </NavLink>

          <NavLink
            to={"/topArtist/medium_term"}
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-zinc-400"
            }
          >
            Last 6 Months
          </NavLink>

          <NavLink
            to={"/topArtist/short_term"}
            className={({ isActive }) =>
              isActive ? "font-bold" : "text-zinc-400"
            }
          >
            Last 4 weeks
          </NavLink>
        </div>

        <div className="flex flex-wrap justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default TopArtist;
