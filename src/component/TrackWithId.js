import React, { useContext, useEffect } from 'react'
import { State } from '../state-management/Context.js'
import { useParams } from 'react-router-dom'
import { Bar } from "react-chartjs-2";

function TrackWithId() {

    const { track_id } = useParams();

    const { accessToken, msToMusicTime, track, setTrack } = useContext(State)

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
        10: "a♯ / B♭",
        11: "B"
    }

    const labels = ["acousticness", "danceability", "energy", "instrumentalness", "liveness", "speechiness", "valence"]

    const data = {
        labels: labels,
        dataset: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ]
    }

    const getTrackDetails = () => {

        const types = ["analysis", "features"];

        // Initialize an object to store the different term data
        const audioData = {
            analysis: {},
            features: {},
            about: {}
        };

        // Use a Promise.all to wait for all fetch requests to complete
        Promise.all(types.map(type =>

            fetch(`https://api.spotify.com/v1/audio-${type}/${track_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    audioData[type] = { ...data };
                })
                .catch(error => console.error('Error:', error))

        ))
            .then(() => {
                fetch(`https://api.spotify.com/v1/tracks/${track_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        audioData.about = { ...data };
                        setTrack(audioData)
                    })
                    .catch(error => console.error('Error:', error))
            });
    }


    useEffect(() => {
        getTrackDetails();
    }, [])

    useEffect(() => {
        console.log(track)
    }, [track])

    useEffect(() => {
        return () => setTrack({});
    }, [])



    return (
        <div className="text-zinc-200 bg-zinc-900 md:ml-24">

            <div>
                <img src={track.about?.album.images[0].url} />
                <div>
                    <p>{track.about?.name}</p>
                    <p>{track.about?.artists[0].name}</p>
                    <a href={track.about?.album.external_urls.spotify} target="_blank">{track.about?.album.name} - {track.about?.album.release_date.substring(0, 4)}</a>
                    <a href={track.about?.external_urls.spotify} target="_blank">Play on Spotify</a>

                </div>
            </div>

            <div className="flex flex-wrap justify-center">
                <Cell tag={"Duration"} value={msToMusicTime(track.about?.duration_ms)} />
                <Cell tag={"Key"} value={musicNotes[track.features?.key]} />
                <Cell tag={"Modality"} value={track.features?.mode === 1 ? "Major" : "Minor"} />
                <Cell tag={"Time Signature"} value={track.features?.time_signature} />
                <Cell tag={"Tempo"} value={Math.floor(track.features?.tempo)} />
                <Cell tag={"Popularity"} value={track.about?.popularity} />
                <Cell tag={"Bars"} value={track.analysis?.bars.length} />
                <Cell tag={"Beats"} value={track.analysis?.beats.length} />
                <Cell tag={"Sections"} value={track.analysis?.sections.length} />
                <Cell tag={"Segments"} value={track.analysis?.sections.length} />
            </div>

            <div>
                {/* <Bar data={data} /> */}
            </div>

        </div>
    )
}

function Cell({ tag, value }) {
    return (
        <div className="bg-zinc-800 m-1 w-32 h-20 flex flex-col justify-center items-center">
            <p className="font-bold text-xl">{value}</p>
            <p className="text-zinc-400 text-sm">{tag}</p>
        </div>
    )
}

export default TrackWithId
