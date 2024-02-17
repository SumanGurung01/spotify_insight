import React, { useContext, useEffect } from "react";
import Dashboard from "./component/Dashboard.js";
import albumArt from "./assets/albumart.jpg";

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
    <div className="mx-5 flex h-screen flex-col items-center justify-center">
      <img
        src={albumArt}
        className="absolute -z-10 h-full w-full object-cover brightness-[0.2]"
        alt="album art"
      />

      <h1 className="text-center text-4xl font-bold text-slate-100 md:text-7xl">
        Discover how you listen <br></br>using{" "}
        <span className="text-green-500">Spotify Insight</span>
      </h1>

      <a
        href={loginUrl}
        className="my-16 rounded-full bg-green-500 px-6 py-3 text-xl font-semibold text-slate-50"
      >
        Login with Spotify
      </a>
    </div>
  );
}

export default App;
