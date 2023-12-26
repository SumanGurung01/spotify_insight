import React from 'react'
import { useParams } from 'react-router-dom'

function ArtistWithId({ }) {

    const { artist_id } = useParams();
    return (
        <div>
            Artist ID : {artist_id}
        </div>
    )
}

export default ArtistWithId
