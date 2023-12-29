import React, { useContext, useEffect, useState } from "react";
import { State } from "../state-management/Context.js";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

function Profile() {
  const { user, accessToken, topArtist, setUser, topTrack, msToMusicTime } =
    useContext(State);

  const [isLoading, setIsLoading] = useState(
    Object.keys(user).length === 0 ? true : false,
  );

  const logOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("expireTime");
    window.location.reload();
  };

  //get user information
  const getUser = (accessToken) => {
    var userData = {
      me: {},
      meFollowing: {},
    };

    Promise.all([
      fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          userData.me = data;
        })
        .catch((error) => console.error("Error:", error)),

      fetch("https://api.spotify.com/v1/me/following?type=artist", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          userData.meFollowing = data;
        })
        .catch((error) => console.error("Error:", error)),
    ]).then(() => {
      setUser(userData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUser(accessToken);
    window.scrollTo(0, 0);
  }, []);

  return isLoading ? (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-zinc-900 md:pl-24">
      <ScaleLoader
        className={`${isLoading ? null : "display:none"}`}
        color={"#1db954"}
        height={80}
        width={10}
      />
    </div>
  ) : (
    <div className="bg-zinc-900 text-zinc-200 md:ml-24">
      <div className="flex flex-col items-center justify-center">
        <img
          src={
            user.me?.images.length === 0
              ? "https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg"
              : user.me.images[0].url
          }
          className="mt-10 h-44 w-44 rounded-full object-cover invert"
        />

        <p className="my-5 line-clamp-1 text-4xl font-bold">
          {user.me?.display_name}
        </p>
        <div className="mb-5 flex gap-10">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">
              {user.me?.followers.total}
            </p>
            <p className="font-semibold text-zinc-400">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-500">
              {user.meFollowing?.artists.items.length}
            </p>
            <p className="font-semibold text-zinc-400">Following</p>
          </div>
        </div>

        <Link
          className="my-10 rounded-full border-2 px-6 py-2 text-xs font-semibold duration-300 hover:bg-zinc-100 hover:text-black"
          onClick={logOut}
        >
          LOG OUT
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="m-5 md:w-1/2">
          <div className="flex items-center p-2 py-8">
            <h1 className="flex-1 text-xl font-bold">Your Top 10 Artists</h1>
            <Link
              className="rounded-full border-2 px-6 py-2 text-xs font-semibold duration-300 hover:bg-zinc-100 hover:text-black"
              to="/topArtist"
            >
              SEE MORE
            </Link>
          </div>
          {topArtist.long_term?.map((artist, index) => {
            return index < 10 ? (
              <Link
                to={`artist/${artist.id}`}
                className="flex cursor-pointer items-center rounded-md p-2 duration-300 hover:bg-zinc-800"
              >
                <img
                  src={artist.images[0].url}
                  className="md:w-18 md:h-18 h-16 w-16 rounded-full object-cover"
                />

                <p className="ml-2 text-base font-semibold">{artist.name}</p>
              </Link>
            ) : null;
          })}
        </div>

        <div className="m-5 mb-24 md:mb-0 md:w-1/2">
          <div className="flex items-center p-2 py-8">
            <h1 className="flex-1 text-xl font-bold">Your Top 10 Tracks</h1>
            <Link
              className="rounded-full border-2 px-6 py-2 text-xs font-semibold duration-300 hover:bg-zinc-100 hover:text-black"
              to="/topTrack"
            >
              SEE MORE
            </Link>
          </div>
          {topTrack.long_term?.map((track, index) => {
            return index < 10 ? (
              <Link
                to={`/track/${track.id}`}
                className="flex cursor-pointer items-center rounded-md p-2 duration-300 hover:bg-zinc-800"
              >
                <img
                  src={track.album.images[0].url}
                  className="md:w-18 md:h-18 h-16 w-16 object-cover"
                />

                <div className="ml-2 flex-1">
                  <p className="line-clamp-1 text-base font-semibold">
                    {track.name}
                  </p>
                  <p className="line-clamp-1 text-sm text-zinc-400">
                    {track.artists[0].name} - {track.album.name}
                  </p>
                </div>

                <p className="text-sm font-semibold text-zinc-400">
                  {msToMusicTime(track.duration_ms)}
                </p>
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
