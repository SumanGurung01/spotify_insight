import React, { useContext, useEffect, useState } from 'react'
import { State } from '../state-management/Context.js'
import { Link } from 'react-router-dom'
import ScaleLoader from "react-spinners/ScaleLoader";

function Profile() {

    const { user, accessToken, topArtist, setUser, topTrack, msToMusicTime } = useContext(State)

    const [isLoading, setIsLoading] = useState(Object.keys(user).length === 0 ? true : false)

    const logOut = () => {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('expireTime');
        window.location.reload()
    }

    //get user information
    const getUser = (accessToken) => {

        var userData = {
            me: {},
            meFollowing: {}
        }

        Promise.all(
            [
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
                        userData.me = data
                    })
                    .catch(error => console.error('Error:', error))
                ,

                fetch('https://api.spotify.com/v1/me/following?type=artist', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        userData.meFollowing = data
                    })
                    .catch(error => console.error('Error:', error)),
            ]
        ).then(() => {
            setUser(userData)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getUser(accessToken)
        window.scrollTo(0, 0)
    }, [])

    return (
        isLoading ?
            <div className="w-screen h-screen fixed flex justify-center items-center bg-zinc-900 md:pl-24">
                <ScaleLoader
                    className={`${isLoading ? null : "display:none"}`}
                    color={'#1db954'} height={80} width={10} />
            </div>
            :
            <div className="text-zinc-200 bg-zinc-900 md:ml-24">

                <div className="flex flex-col justify-center items-center">
                    <img src={user.me?.images.length === 0 ? "https://t3.ftcdn.net/jpg/01/77/54/02/360_F_177540231_SkxuDjyo8ECrPumqf0aeMbean2Ai1aOK.jpg" : user.me.images[0].url} className="invert w-44 h-44 rounded-full object-cover mt-10" />

                    <p className="text-4xl font-bold my-5 line-clamp-1">{user.me?.display_name}</p>
                    <div className="flex mb-5 gap-10">
                        <div className="text-center">
                            <p className="text-green-500 font-bold text-3xl">{user.me?.followers.total}</p>
                            <p className="text-zinc-400 font-semibold">Followers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-green-500 font-bold text-3xl">{user.meFollowing?.artists.items.length}</p>
                            <p className="text-zinc-400 font-semibold">Following</p>
                        </div>
                    </div>

                    <Link className="border-2 my-10 py-2 px-6 rounded-full font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black" onClick={logOut}>LOG OUT</Link>
                </div>

                <div className="flex flex-col md:flex-row">

                    <div className="md:w-1/2 m-5">
                        <div className="flex items-center p-2 py-8">
                            <h1 className="text-xl font-bold flex-1">Your Top 10 Artists</h1>
                            <Link className="border-2 py-2 px-6 rounded-full font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black" to='/topArtist'>SEE MORE</Link>
                        </div>
                        {
                            topArtist.long_term?.map((artist, index) => {
                                return (index < 10 ?
                                    <Link to={`artist/${artist.id}`} className="flex items-center rounded-md duration-300 cursor-pointer hover:bg-zinc-800 p-2">

                                        <img
                                            src={artist.images[0].url}
                                            className="rounded-full w-16 h-16 object-cover md:w-18 md:h-18"
                                        />

                                        <p className="font-semibold text-base ml-2">{artist.name}</p>

                                    </Link>
                                    : null
                                )
                            })
                        }
                    </div>

                    <div className="md:w-1/2 m-5 mb-24 md:mb-0">
                        <div className="flex items-center p-2 py-8">
                            <h1 className="text-xl font-bold flex-1">Your Top 10 Tracks</h1>
                            <Link className="border-2 py-2 px-6 rounded-full font-semibold text-xs duration-300 hover:bg-zinc-100 hover:text-black" to='/topTrack'>SEE MORE</Link>
                        </div>
                        {
                            topTrack.long_term?.map((track, index) => {
                                return (index < 10 ?
                                    <Link to={`/track/${track.id}`} className="flex items-center hover:bg-zinc-800 rounded-md duration-300 cursor-pointer p-2">

                                        <img
                                            src={track.album.images[0].url}
                                            className="w-16 h-16 object-cover md:w-18 md:h-18"
                                        />

                                        <div className="flex-1 ml-2">
                                            <p className="font-semibold text-base line-clamp-1">{track.name}</p>
                                            <p className="text-zinc-400 text-sm line-clamp-1">{track.artists[0].name} - {track.album.name}</p>
                                        </div>

                                        <p className="font-semibold text-zinc-400 text-sm">{msToMusicTime(track.duration_ms)}</p>
                                    </Link>
                                    : null
                                )
                            })
                        }
                    </div>
                </div >
            </div >
    )
}

export default Profile
