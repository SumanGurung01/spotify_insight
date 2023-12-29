import React, { useEffect, useContext, useState } from "react";
import { State } from "../state-management/Context.js";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Link } from "react-router-dom";

function Playlist() {
  const { accessToken, playlist, setPlaylist } = useContext(State);

  const [isLoading, setIsLoading] = useState(
    playlist.length === 0 ? true : false,
  );

  // get user playlist
  const getUserPlaylist = (accessToken) => {
    fetch("https://api.spotify.com/v1/me/playlists?limit=50", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaylist(data.items);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // if first time then fetch playlist from api else use already assigned playlist
    if (playlist.length === 0) {
      getUserPlaylist(accessToken);
    }
  }, []);

  return isLoading ? (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-zinc-900 md:pl-24">
      <ScaleLoader color={"#1db954"} height={80} width={10} />
    </div>
  ) : (
    <div className="bg-zinc-900 px-7 pb-24 text-zinc-200 md:pb-5 md:pl-24">
      <h1 className="py-8 text-center text-xl font-bold md:px-7 md:text-left">
        Your Playlists
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {playlist?.map((list) => {
          return (
            <Link
              to={`/playlist/${list.id}`}
              className="flex w-72 cursor-pointer flex-col gap-2 duration-500 hover:underline md:w-60"
              key={list.id}
            >
              <img className="w-72 md:w-60" src={list.images[0].url} />

              <p className="line-clamp-1 text-lg font-bold">{list.name}</p>

              <p className="line-clamp-1 text-sm font-semibold text-zinc-400">
                {list.tracks.total} Tracks
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
