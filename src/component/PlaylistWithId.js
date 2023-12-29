import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { State } from "../state-management/Context";
import ScaleLoader from "react-spinners/ScaleLoader";
import { Chart } from "chart.js/auto";

function PlaylistWithId() {
  const { playlist_id } = useParams();

  const { accessToken, msToMusicTime } = useContext(State);

  const [currentPlaylist, setCurrentPlaylist] = useState({});

  const [playlistFeature, setPlaylistFeature] = useState({});

  const [trackInPlaylist, setTrackInPlaylist] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getPlaylistFeatures = async (accessToken) => {
    var trackIds = [];
    var features = [];

    // get current playlist info
    await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentPlaylist(data);
      })
      .catch((error) => console.error("Error:", error));

    // get current playlist tracks info
    await fetch(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=50`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setTrackInPlaylist(data.items);
        data.items.forEach((item) => {
          trackIds.push(item.track.id);
        });
      })
      .catch((error) => console.error("Error:", error));

    // get current playlist features
    await fetch(
      `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        features = data.audio_features;
      })
      .catch((error) => console.error("Error:", error));

    var tempFeature = {
      acousticness: 0,
      danceability: 0,
      energy: 0,
      instrumentalness: 0,
      liveness: 0,
      speechiness: 0,
      valence: 0,
    };

    features.forEach((feature) => {
      tempFeature.acousticness += feature.acousticness;
      tempFeature.danceability += feature.danceability;
      tempFeature.energy += feature.energy;
      tempFeature.instrumentalness += feature.instrumentalness;
      tempFeature.liveness += feature.liveness;
      tempFeature.speechiness += feature.speechiness;
      tempFeature.valence += feature.valence;
    });

    // Iterate through each property of the object
    for (var key in tempFeature) {
      if (tempFeature.hasOwnProperty(key)) {
        // Divide each value by 2
        tempFeature[key] = tempFeature[key] / features.length;
      }
    }

    setIsLoading(false);
    setPlaylistFeature(tempFeature);
  };

  useEffect(() => {
    getPlaylistFeatures(accessToken);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const ctx = document.getElementById("myChart").getContext("2d");

      const graphData = [
        playlistFeature.acousticness,
        playlistFeature.danceability,
        playlistFeature.energy,
        playlistFeature.instrumentalness,
        playlistFeature.liveness,
        playlistFeature.speechiness,
        playlistFeature.valence,
      ];

      const barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "acousticness",
            "danceability",
            "energy",
            "instrumentalness",
            "liveness",
            "speechiness",
            "valence",
          ],
          datasets: [
            {
              data: graphData,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 159, 64, 0.2)",
                "rgba(255, 205, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(201, 203, 207, 0.2)",
              ],
              borderColor: [
                "rgb(255, 99, 132)",
                "rgb(255, 159, 64)",
                "rgb(255, 205, 86)",
                "rgb(75, 192, 192)",
                "rgb(54, 162, 235)",
                "rgb(153, 102, 255)",
                "rgb(201, 203, 207)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          aspectRatio: 1,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [playlistFeature]);

  return isLoading ? (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-zinc-900 md:pl-24">
      <ScaleLoader color={"#1db954"} height={80} width={10} />
    </div>
  ) : (
    <div className="flex flex-col bg-zinc-900 pt-3 text-zinc-200 md:ml-24 md:flex-row">
      <div className="m-5 pl-2 md:w-1/2">
        <Link
          to={currentPlaylist.external_urls.spotify}
          target="_bLank"
          className="flex flex-col items-center justify-center duration-300 hover:underline md:items-start md:justify-start"
        >
          <img
            src={currentPlaylist.images[0].url}
            className="my-2 h-60 w-60 md:h-72 md:w-72"
          />

          <p className="line-clamp-1 text-3xl font-bold">
            {currentPlaylist.name}
          </p>

          <p className="line-clamp-1 text-lg font-semibold text-zinc-400">
            {currentPlaylist.tracks.total} Tracks
          </p>
        </Link>

        <p className="my-10 text-center text-xl font-bold md:text-start">
          Playlist Features
        </p>

        <canvas
          id="myChart"
          className="md:mr-10 lg:mr-20 xl:mr-32 2xl:mr-60"
        ></canvas>
      </div>

      <div className="m-5 mb-24 md:mb-10 md:w-1/2">
        <div className="flex items-center p-2">
          <h1 className="flex-1 text-xl font-bold">Tracks in Playlist</h1>
        </div>

        {trackInPlaylist?.map((track) => {
          return (
            <Link
              to={`/track/${track.track.id}`}
              className="flex cursor-pointer items-center rounded-md p-2 duration-300 hover:bg-zinc-800"
            >
              <img
                src={track.track.album.images[0].url}
                className="md:w-18 md:h-18 h-16 w-16 object-cover"
              />

              <div className="ml-2 flex-1">
                <p className="line-clamp-1 text-base font-semibold">
                  {track.track.name}
                </p>
                <p className="line-clamp-1 text-sm text-zinc-400">
                  {track.track.artists[0].name} - {track.track.album.name}
                </p>
              </div>

              <p className="text-sm font-semibold text-zinc-400">
                {msToMusicTime(track.track.duration_ms)}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default PlaylistWithId;
