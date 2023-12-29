import React, { useContext, useEffect } from "react";
import Dashboard from "./component/Dashboard.js";

import { loginUrl, getAccessToken } from "./libs/spotify.js";
import { State } from "./state-management/Context.js";

function App() {
  const { accessToken, setAccessToken } = useContext(State);

  useEffect(() => {
    const _token = getAccessToken();

    if (_token) {
      setAccessToken(_token);
      sessionStorage.setItem("accessToken", _token);

      // expire time will be 3600 sec from current login time
      sessionStorage.setItem(
        "expireTime",
        Math.floor(new Date().getTime() / 1000) + 3600,
      );
    }

    window.location.hash = "";
  }, []);

  return accessToken !== null ? (
    <Dashboard />
  ) : (
    <div className="flex h-screen flex-col items-center justify-center bg-black">
      <img
        src={
          "https://kreafolk.com/cdn/shop/articles/BlogThumbnail_751d3381-21a8-49d0-bf12-ca7f83b205f6.jpg?v=1692901525&width=2048"
        }
        className="w-64"
      />

      <h1 className="text-2xl text-slate-100">Welcome to Spotify Insight</h1>

      <a
        href={loginUrl}
        className="my-10 rounded-full bg-[#1DB954] px-6 py-3 text-xl text-slate-50"
      >
        Login with Spotify
      </a>
    </div>
  );
}

export default App;
