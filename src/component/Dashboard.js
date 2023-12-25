import React, { useContext, useEffect, useState } from 'react'
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

function Dashboard() {

    const { accessToken, setUser, topArtist, setTopArtist, topTrack, setTopTrack, setPlaylist, setRecentlyPlayed } = useContext(State)

    useEffect(() => {
        //get user information
        const getUser = (accessToken) => {
            fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setUser(data)
                })
                .catch(error => console.error('Error:', error));
        }

        // get user top artist
        const getUserTopArtist = (accessToken) => {

            const terms = ["short_term", "medium_term", "long_term"];

            // Initialize an object to store the different term data
            const termData = {
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
                    setTopArtist(initial => ({ ...initial, ...termData }));
                });

        }

        // get user top track
        const getUserTopTrack = (accessToken) => {
            const terms = ["short_term", "medium_term", "long_term"];

            // Initialize an object to store the different term data
            const termData = {
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


        // get user playlist
        const getUserPlaylist = (accessToken) => {
            fetch('https://api.spotify.com/v1/me/playlists?limit=50', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPlaylist(data.items)
                })
                .catch(error => console.error('Error:', error));
        }

        // get user recently played
        const getRecentlyPlayed = (accessToken) => {
            fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    setRecentlyPlayed(data.items)
                })
                .catch(error => console.error('Error:', error));
        }

        getUser(accessToken)
        getUserTopArtist(accessToken)
        getUserTopTrack(accessToken)
        getUserPlaylist(accessToken)
        getRecentlyPlayed(accessToken)

    }, [])

    useEffect(() => {
        console.log("Dashboard useEffect -> AccessToken : ", accessToken)
    }, [])

    return (
        <div className="bg-black h-screen">
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
            </Routes>
        </div>
    )
}

export default Dashboard
