import React, { useContext, useEffect } from 'react'
import { State } from '../state-management/Context.js'
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar.js'
import TopArtist from './TopArtist.js'
import Profile from './Profile.js'
import Playlist from './Playlist.js';
import TopTrack from './TopTrack.js';
import Recent from './Recent.js';
import { TrackOnTerm } from './TopTrack.js';
import { ArtistOnTerm } from './TopArtist.js'
import ArtistWithId from './ArtistWithId.js';
import PlaylistWithId from './PlaylistWithId.js';
import TrackWithId from './TrackWithId.js';

function Dashboard() {

    const { accessToken, topArtist, setTopArtist, topTrack, setTopTrack } = useContext(State)

    // get user top artist
    const getUserTopArtist = (accessToken) => {

        const terms = ["short_term", "medium_term", "long_term"];

        // Initialize an object to store the different term data
        var termData = {
            short_term: [],
            medium_term: [],
            long_term: [],
        };

        // Use a Promise.all to wait for all fetch requests to complete
        Promise.all(terms.map(term =>
            fetch(`https://api.spotify.com/v1/me/top/artists?time_range=${term}&limit=50`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    termData[term] = data.items;
                })
                .catch(error => console.error('Error:', error))
        ))
            .then(() => {
                // After all requests are complete, update state in a single batch
                setTopArtist(termData);
            });
    }


    // get user top track
    const getUserTopTrack = (accessToken) => {
        const terms = ["short_term", "medium_term", "long_term"];

        // Initialize an object to store the different term data
        var termData = {
            short_term: [],
            medium_term: [],
            long_term: [],
        };

        // Use a Promise.all to wait for all fetch requests to complete
        Promise.all(terms.map(term =>
            fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=50`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    termData[term] = data.items;
                })
                .catch(error => console.error('Error:', error))
        ))
            .then(() => {
                // After all requests are complete, update state in a single batch
                setTopTrack(initial => ({ ...initial, ...termData }));
            });
    };


    useEffect(() => {
        getUserTopArtist(accessToken)
        getUserTopTrack(accessToken)
    }, [])


    return (
        <div className="bg-zinc-900 h-screen">

            <Navbar />

            <Routes>

                <Route path="/" element={<Profile />} />

                <Route path="/topArtist" element={<TopArtist />}>
                    <Route index element={<ArtistOnTerm artist={topArtist?.long_term} />} />
                    <Route path="/topArtist/long_term" element={<ArtistOnTerm artist={topArtist?.long_term} />} />
                    <Route path="/topArtist/medium_term" element={<ArtistOnTerm artist={topArtist?.medium_term} />} />
                    <Route path="/topArtist/short_term" element={<ArtistOnTerm artist={topArtist?.short_term} />} />
                </Route>

                <Route path="/topTrack" element={<TopTrack />} >
                    <Route index element={<TrackOnTerm track={topTrack?.long_term} />} />
                    <Route path="/topTrack/long_term" element={<TrackOnTerm track={topTrack?.long_term} />} />
                    <Route path="/topTrack/medium_term" element={<TrackOnTerm track={topTrack?.medium_term} />} />
                    <Route path="/topTrack/short_term" element={<TrackOnTerm track={topTrack?.short_term} />} />
                </Route>

                <Route path="/recent" element={<Recent />} />

                <Route path="/playlist" element={<Playlist />} />

                <Route path="/track/:track_id" element={<TrackWithId />} />

                <Route path="/artist/:artist_id" element={<ArtistWithId />} />

                <Route path="/playlist/:playlist_id" element={<PlaylistWithId />} />

            </Routes>

        </div>
    )
}

export default Dashboard
