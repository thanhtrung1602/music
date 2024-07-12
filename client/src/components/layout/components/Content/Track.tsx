import { useEffect, useRef, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import WaveSurfer from "wavesurfer.js";
import moment from "moment";

import { fetchId } from "~/Api";
import icon from "~/assets/img/icon";
import { ITrack } from "~/types/track";

function Track() {
  const { id } = useParams();
  const waveSurFerRefs = useRef<{ [key: string]: WaveSurfer | null }>({});
  const waveformRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [playingTrack, setPlayingTrack] = useState<number | null>(null);
  const [durations, setDurations] = useState<{ [key: string]: number }>({});

  const { data: tracks } = fetchId("/tracks/getTrack/", Number(id));

  useEffect(() => {
    if (tracks) {
      const waveSurfersPromises = tracks.track.map((track: ITrack) => {
        if (waveformRefs.current[track.id]) {
          return new Promise<void>((resolve, reject) => {
            const waveSurfer = WaveSurfer.create({
              container: waveformRefs.current[track.id]!,
              waveColor: "#666",
              progressColor: "#f50",
              dragToSeek: true,
              width: 650,
              height: 60,
              barGap: 2,
              barRadius: 20,
              barWidth: 2,
            });

            waveSurfer.on("ready", () => {
              setDurations((prevDuration) => ({
                ...prevDuration,
                [track.id]: waveSurfer.getDuration(),
              }));
              resolve();
            });

            waveSurfer.on("error", (error) => {
              console.error("Error loading track:", error);
              reject(error);
            });

            waveSurfer.load(`${track.sound}`);
            waveSurFerRefs.current[track.id] = waveSurfer;
          });
        }
        return Promise.resolve();
      });

      Promise.all(waveSurfersPromises)
        .then(() => {
          console.log("All waveforms are ready");
        })
        .catch((error) => {
          console.error("Error initializing waveforms:", error);
        });
    }
  }, [tracks]);

  const handlePlayPause = (trackId: number) => {
    const waveSurfer = waveSurFerRefs.current[trackId];
    if (waveSurfer) {
      if (playingTrack === trackId) {
        waveSurfer.pause();
        setPlayingTrack(null);
      } else {
        if (playingTrack) {
          waveSurFerRefs.current[playingTrack]?.pause();
        }
        waveSurfer.play();
        setPlayingTrack(trackId);
      }
    }
  };

  const formatTime = (time: number) => {
    let min: number | string = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec: string | number = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  return (
    <section className="w-[860px] border-r border-[#f2f2f2] pr-[5px]">
      {tracks &&
        tracks.track.map((track: ITrack) => (
          <div className="mb-8 flex" key={track.id}>
            <NavLink to={"/detail/" + track.id}>
              <article className="">
                <img
                  className="h-[160px] w-[200px]"
                  src={track.image || track.userData?.image}
                  alt=""
                />
              </article>
            </NavLink>
            <article className="ml-3 flex w-full flex-col justify-between">
              <article className="flex w-full gap-1.5">
                <article>
                  <button
                    onClick={() => handlePlayPause(track.id)}
                    className="relative h-[36px] w-[36px] rounded-full border-[#f50] bg-[#f50]"
                  >
                    {playingTrack === track.id ? (
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
                      {track?.userData?.username}
                    </span>
                    <NavLink to={"/detail/" + track.id}>
                      <span className="text-base text-[#333]">
                        {track.track_name}
                      </span>
                    </NavLink>
                  </div>
                  <div className="w-[15%]">
                    <time dateTime="2024-05-14T06:49:29.000Z">
                      <span className="w-full text-xs text-[#ccc]">
                        {moment(track.createdAt).fromNow()}
                      </span>
                    </time>
                  </div>
                </article>
              </article>
              <article className="flex items-center">
                <div
                  id={`waveform-${track.id}`}
                  className=""
                  ref={(el) => (waveformRefs.current[track.id] = el)}
                ></div>
                <div className="h-4 bg-black p-[2px] text-[10px] text-[#999]">
                  <span>{formatTime(durations[track.id] || 0)}</span>
                </div>
              </article>
              <article className="flex items-center justify-between">
                <MiniStart id={track.id} />
              </article>
            </article>
          </div>
        ))}
    </section>
  );
}

function MiniStart({ id }: { id: number }) {
  const { data: countComment } = fetchId(
    "/comments/getCommentTrackCount/",
    Number(id),
  );
  const { data: countTrack } = fetchId("/tracks/getAllLikeTrack/", Number(id));
  const countLikeTrack = countTrack?.getAllLikeTrack;
  const countCommentTrack = countComment?.amountCommentTrack;
  return (
    <>
      <div className="flex gap-1">
        <button className="flex h-[22px] items-center gap-1 rounded border py-[2px] pl-2 pr-2.5 text-xs">
          <img src={icon.heart} alt="" />
          <span>{countLikeTrack}</span>
        </button>
        <button className="flex h-[22px] items-center gap-1 rounded border py-[2px] pl-2 pr-2.5 text-xs">
          <img src={icon.repost} alt="" />
          <span>14</span>
        </button>
        <button className="flex h-[22px] items-center gap-1 rounded border py-[2px] pl-2 pr-2.5 text-xs">
          <img src={icon.share} alt="" />
          <span>Share</span>
        </button>
        <button className="flex h-[22px] items-center gap-1 rounded border py-[2px] pl-2 pr-2.5 text-xs">
          <img src={icon.cpLink} alt="" />
          <span>Copy Link</span>
        </button>
        <button className="flex h-[22px] items-center gap-1 rounded border py-[2px] pl-2 pr-2.5 text-xs">
          <img src={icon.more} alt="" />
          <span>More</span>
        </button>
      </div>
      <ul className="flex items-center gap-3">
        <li className="flex items-center gap-1 text-xs text-[#999]">
          <img src={icon.play} alt="" />
          <span>104k</span>
        </li>
        <li className="flex items-center gap-1 text-xs text-[#999]">
          <img src={icon.comment} alt="" />
          <span>{countCommentTrack}</span>
        </li>
      </ul>
    </>
  );
}

export default Track;
