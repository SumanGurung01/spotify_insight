import React from 'react'
import { useParams } from 'react-router-dom'

function PlaylistWithId() {
    const { playlist_id } = useParams()
    return (
        <div>
            Playlist ID:{playlist_id}
        </div>
    )
}

export default PlaylistWithId
