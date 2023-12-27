import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { State } from '../state-management/Context.js'
import { Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";



function ArtistWithId() {

    const { artist_id } = useParams();
    const { accessToken } = useContext(State)

    const [artist, setArtist] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const capitalCase = (sentence) => {
        return sentence.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
    }


    const getArtistDetails = () => {

        const artistDetail = {
            about: {},
            album: []
        }

        const artistUrl = [`https://api.spotify.com/v1/artists/${artist_id}`, `https://api.spotify.com/v1/artists/${artist_id}/albums`]

        Promise.all([
            fetch(artistUrl[0], {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    artistDetail.about = { ...data }
                })
                .catch(error => console.error('Error:', error))
            ,
            fetch(artistUrl[1], {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    artistDetail.album = data.items
                })
                .catch(error => console.error('Error:', error))
        ]

        ).then(() => {
            setIsLoading(false)
            setArtist(artistDetail)
        })

    }

    useEffect(() => {
        getArtistDetails()
    }, [])

    useEffect(() => {
        console.log(artist)
    }, [artist])

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

                    <img src={artist.about?.images[0].url} className="object-cover rounded-full w-60 h-60 my-8 md:w-72 md:h-72" />

                    <p className="font-bold line-clamp-1 text-2xl md:text-4xl ">{artist.about?.name}</p>

                    <div className="flex justify-center text-lg text-blue-400 font-semibold gap-10 mt-10 md:text-2xl">
                        <div className="text-center">
                            <p>{artist.about?.followers.total}</p>
                            <p className="text-sm text-zinc-400 md:text-base">Followers</p>
                        </div>

                        <div className="text-center">
                            {
                                artist.about?.genres.map(genre => {
                                    return <p>{capitalCase(genre)}</p>
                                })
                            }
                            <p className="text-sm text-zinc-400 md:text-base">Genre</p>
                        </div>

                        <div className="text-center">
                            <p>{artist.about?.popularity}%</p>
                            <p className="text-sm text-zinc-400 md:text-base">Popularity</p>
                        </div>

                    </div>
                </div>


                <p className="text-center text-xl font-bold my-10 mt-20  md:text-2xl">Album and Singles from Artist</p>

                <div className="flex flex-wrap justify-center items-center gap-10 pb-24 md:pb-10">

                    {
                        artist.album?.map(album => {
                            return (

                                <Link to={album.external_urls.spotify} target="_blank" className="w-72 flex flex-col gap-2 duration-500 cursor-pointer hover:underline md:w-60">
                                    <img src={album.images[0].url} className="w-72 h-72 object-cover md:w-60 md:h-60" />

                                    <p className="font-bold text-lg line-clamp-1">{album.name} - {album.release_date.substring(0, 4)}</p>

                                    <p className="font-semibold text-sm text-zinc-400 line-clamp-1">{capitalCase(album.album_type)} - {album.total_tracks} Tracks</p>

                                </Link>
                            )
                        })
                    }


                </div>
            </div>
    )
}

export default ArtistWithId
