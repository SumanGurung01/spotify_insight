import React, { useContext, useEffect, useState } from "react";
import { State } from "../state-management/Context.js";
import { useParams } from "react-router-dom";
import { Chart } from "chart.js/auto";
import ScaleLoader from "react-spinners/ScaleLoader";

function TrackWithId() {
  const { track_id } = useParams();

  const { accessToken, msToMusicTime } = useContext(State);

  const [track, setTrack] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const musicNotes = {
    0: "C",
    1: "C♯ / D♭",
    2: "D",
    3: "D♯ / E♭",
    4: "E",
    5: "F",
    6: "F♯ / G♭",
    7: "G",
    8: "G♯ / A♭",
    9: "A",
    10: "A♯ / B♭",
    11: "B",
  };

  const getTrackDetails = () => {
    const types = ["analysis", "features"];

    // Initialize an object to store the different term data
    const audioData = {
      analysis: {},
      features: {},
      about: {},
    };

    // Use a Promise.all to wait for all fetch requests to complete
    Promise.all(
      types.map((type) =>
        fetch(`https://api.spotify.com/v1/audio-${type}/${track_id}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            audioData[type] = { ...data };
          })
          .catch((error) => console.error("Error:", error)),
      ),
    ).then(() => {
      fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          audioData.about = { ...data };
          setTrack(audioData);

          //once track data is fetched set isLoading False
          setIsLoading(false);
        })
        .catch((error) => console.error("Error:", error));
    });
  };

  //initial load
  useEffect(() => {
    window.scrollTo(0, 0);
    getTrackDetails();
  }, []);

  // on track change
  useEffect(() => {
    // isLoading is false means track are fetched now 'id' of canvas can be selected to display graph
    if (!isLoading) {
      const ctx = document.getElementById("myChart").getContext("2d");

      const graphData = [
        track.features?.acousticness,
        track.features?.danceability,
        track.features?.energy,
        track.features?.instrumentalness,
        track.features?.liveness,
        track.features?.speechiness,
        track.features?.valence,
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
  }, [track]);

  return isLoading ? (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-zinc-900 md:pl-24">
      <ScaleLoader color={"#1db954"} height={80} width={10} />
    </div>
  ) : (
    <div className="flex flex-col bg-zinc-900 pt-3 text-zinc-200 md:ml-24 md:flex-row">
      <div className="m-5 flex flex-col items-center justify-center pl-2 md:w-1/2 md:items-start md:justify-start">
        <img
          className="my-2 h-60 w-60 md:h-72 md:w-72"
          src={track.about?.album.images[0].url}
        />

        <div className="flex flex-col items-center justify-center gap-3 md:items-start md:justify-start">
          <p className="line-clamp-1 text-3xl font-bold">{track.about?.name}</p>

          <a
            className="line-clamp-1 text-xl font-semibold text-zinc-400 hover:underline"
            href={track.about?.artists[0].external_urls.spotify}
            target="_blank"
          >
            {track.about?.artists[0].name}
          </a>

          <a
            className="line-clamp-1 text-lg font-semibold text-zinc-400 hover:underline"
            href={track.about?.album.external_urls.spotify}
            target="_blank"
          >
            {track.about?.album.name} -{" "}
            {track.about?.album.release_date.substring(0, 4)}
          </a>

          <a
            className="my-6 mb-10 w-44 rounded-full bg-[#1DB954] px-6 py-3 text-center font-semibold"
            href={track.about?.external_urls.spotify}
            target="_blank"
          >
            Play on Spotify
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 md:items-start md:justify-start">
          <Cell
            tag={"Duration"}
            value={msToMusicTime(track.about?.duration_ms)}
          />
          <Cell tag={"Key"} value={musicNotes[track.features?.key]} />
          <Cell
            tag={"Modality"}
            value={track.features?.mode === 1 ? "Major" : "Minor"}
          />
          <Cell tag={"Time Signature"} value={track.features?.time_signature} />
          <Cell tag={"Tempo (BPM)"} value={Math.floor(track.features?.tempo)} />
          <Cell tag={"Popularity"} value={`${track.about?.popularity}%`} />
          <Cell tag={"Bars"} value={track.analysis?.bars.length} />
          <Cell tag={"Beats"} value={track.analysis?.beats.length} />
          <Cell tag={"Sections"} value={track.analysis?.sections.length} />
          <Cell tag={"Segments"} value={track.analysis?.segments.length} />
        </div>
      </div>

      <div className="m-5 md:w-1/2">
        <p className="text-center text-xl font-bold">Track Features</p>

        <canvas
          id="myChart"
          className="mb-24 md:mr-10 lg:mr-20 xl:mr-32 2xl:mr-60"
        ></canvas>
      </div>
    </div>
  );
}

function Cell({ tag, value }) {
  return (
    <div className="flex h-20 w-32 flex-col items-center justify-center rounded-sm bg-zinc-800">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-zinc-400">{tag}</p>
    </div>
  );
}

export default TrackWithId;
