import moment from "moment";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { fetchId } from "~/Api";
import icon from "~/assets/img/icon";
import { IUser } from "~/types/users";

type Playlist = {
  id: number;
  playlist_name: string;
  image: string;
  user_id: number;
  userData: IUser;
  createdAt: Date;
};

function Playlists() {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const { id } = useParams();
  const { data: playlistAll } = fetchId("/tracks/getPlaylist/", Number(id));
  return (
    <div>
      <section className="w-[860px] border-r border-[#f2f2f2] pr-[5px]">
        {playlistAll &&
          playlistAll.getPlaylist.map((playlist: Playlist) => (
            <div className="mb-8 flex" key={playlist.id}>
              <NavLink to={"/detail/" + playlist.id}>
                <article className="">
                  <img
                    className="h-[160px] w-[200px]"
                    src={playlist.image || playlist.userData?.image}
                    alt=""
                  />
                </article>
              </NavLink>
              <article className="ml-3 flex w-full flex-col justify-between">
                <article className="flex w-full gap-1.5">
                  <article>
                    <button className="relative h-[36px] w-[36px] rounded-full border-[#f50] bg-[#f50]">
                      {playingTrack === playlist.id ? (
                        <img
                          className="absolute left-2/4 top-2/4 h-3/5 w-2/5 -translate-x-2/4 -translate-y-2/4"
                          src={icon.pause}
                          alt=""
                        />
                      ) : (
                        <img
                          className="absolute left-2/4 top-2/4 h-3/5 w-2/5 -translate-x-2/4 -translate-y-2/4"
                          src={icon.playTrack}
                          alt=""
                        />
                      )}
                    </button>
                  </article>
                  <article className="flex w-full justify-between">
                    <div className="flex w-full flex-col">
                      <span className="text-xs text-[#999]">
                        {playlist?.userData?.username}
                      </span>
                      <NavLink to={"/detail/" + playlist.id}>
                        <span className="text-base text-[#333]">
                          {playlist.playlist_name}
                        </span>
                      </NavLink>
                    </div>
                    <div className="w-[15%]">
                      <time dateTime="2024-05-14T06:49:29.000Z">
                        <span className="w-full text-xs text-[#ccc]">
                          {moment(playlist.createdAt).fromNow()}
                        </span>
                      </time>
                    </div>
                  </article>
                </article>
                {/* <article className="flex items-center">
                  <div
                    id={`waveform-${track.id}`}
                    className=""
                    ref={(el) => (waveformRefs.current[track.id] = el)}
                  ></div>
                  <div className="h-4 bg-black p-[2px] text-[10px] text-[#999]">
                    <span>{formatTime(durations[track.id] || 0)}</span>
                  </div>
                </article> */}
                <article className="flex items-center justify-between">
                  {/* <MiniStart id={track.id} /> */}
                </article>
              </article>
            </div>
          ))}
      </section>
    </div>
  );
}

export default Playlists;
