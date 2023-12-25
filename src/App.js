import React, { useContext, useEffect, useState } from 'react'
import Dashboard from './component/Dashboard.js'

import { loginUrl, getAccessToken } from './libs/spotify.js'
import { State } from './state-management/Context.js'

function App() {

  const { accessToken, setAccessToken } = useContext(State)

  const [token, setToken] = useState(null)

  useEffect(() => {

    const _token = getAccessToken();

    if (_token) {
      setToken(_token)
      setAccessToken(_token)
      localStorage.setItem('accessToken', _token);
    }

    setTimeout(() => {
      localStorage.removeItem('accessToken');
    }, 3600000); // 10000 milliseconds = 10 seconds

    window.location.hash = ""
  }, [])

  return (
    accessToken ? <Dashboard /> :
      <div className="flex flex-col bg-black h-screen justify-center items-center">
        <img
          src={"https://kreafolk.com/cdn/shop/articles/BlogThumbnail_751d3381-21a8-49d0-bf12-ca7f83b205f6.jpg?v=1692901525&width=2048"}
          className="w-64"
        />
        <h1 className="text-slate-100 text-2xl">Welcome to Spotify Insight</h1>
        <a href={loginUrl} className="bg-[#1DB954] py-3 px-6 rounded-full text-slate-50 text-xl my-10">Login with Spotify</a>
      </div>
  )
}

export default App
