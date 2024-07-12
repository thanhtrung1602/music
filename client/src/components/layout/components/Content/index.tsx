// import { BrowserRouter, Route, Router } from "react-router-dom";
import Playlists from "./Playlist";
import Track from "./Track";

function Content() {
  return (
    <div>
      <Track />
      <Playlists />
    </div>
  );
}

export default Content;
