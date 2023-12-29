import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { State } from "../state-management/Context.js";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";

function ArtistWithId() {
  const { artist_id } = useParams();

  const { accessToken } = useContext(State);

  const [artist, setArtist] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const capitalCase = (sentence) => {
    return sentence
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getArtistDetails = () => {
    const artistDetail = {
      about: {},
      album: [],
    };

    const artistUrl = [
      `https://api.spotify.com/v1/artists/${artist_id}`,
      `https://api.spotify.com/v1/artists/${artist_id}/albums`,
    ];

    Promise.all([
      fetch(artistUrl[0], {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          artistDetail.about = { ...data };
        })
        .catch((error) => console.error("Error:", error)),
      fetch(artistUrl[1], {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          artistDetail.album = data.items;
        })
        .catch((error) => console.error("Error:", error)),
    ]).then(() => {
      setIsLoading(false);
      setArtist(artistDetail);
    });
  };

  useEffect(() => {
    getArtistDetails();
  }, []);

  return isLoading ? (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-zinc-900 md:pl-24">
      <ScaleLoader color={"#1db954"} height={80} width={10} />
    </div>
  ) : (
    <div className="bg-zinc-900 text-zinc-200 md:ml-24">
      <div className="flex flex-col items-center justify-center">
        <img
          src={artist.about?.images[0].url}
          className="my-8 h-60 w-60 rounded-full object-cover md:h-72 md:w-72"
        />

        <p className="line-clamp-1 text-2xl font-bold md:text-4xl ">
          {artist.about?.name}
        </p>

        <div className="mt-10 flex justify-center gap-10 text-lg font-semibold text-blue-400 md:text-2xl">
          <div className="text-center">
            <p>{artist.about?.followers.total}</p>
            <p className="text-sm text-zinc-400 md:text-base">Followers</p>
          </div>

          <div className="text-center">
            {artist.about?.genres.map((genre) => {
              return <p>{capitalCase(genre)}</p>;
            })}

            <p className="text-sm text-zinc-400 md:text-base">Genre</p>
          </div>

          <div className="text-center">
            <p>{artist.about?.popularity}%</p>
            <p className="text-sm text-zinc-400 md:text-base">Popularity</p>
          </div>
        </div>
      </div>

      <p className="my-10 mt-20 text-center text-xl font-bold  md:text-2xl">
        Album and Singles from Artist
      </p>

      <div className="flex flex-wrap items-center justify-center gap-10 pb-24 md:pb-10">
        {artist.album?.map((album) => {
          return (
            <Link
              to={album.external_urls.spotify}
              target="_blank"
              className="flex w-72 cursor-pointer flex-col gap-2 duration-500 hover:underline md:w-60 "
            >
              <img
                src={album.images[0].url}
                className="h-72 w-72 object-cover md:h-60 md:w-60"
              />

              <p className="line-clamp-1 text-lg font-bold">
                {album.name} - {album.release_date.substring(0, 4)}
              </p>

              <p className="line-clamp-1 text-sm font-semibold text-zinc-400">
                {capitalCase(album.album_type)} - {album.total_tracks} Tracks
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ArtistWithId;
