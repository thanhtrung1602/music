import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useParams } from "react-router-dom";
import { FastAverageColor } from "fast-average-color";
import { fetchId } from "~/Api";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import { useQuery } from "@tanstack/react-query";
import { ITrack } from "~/types/track";

function Home() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const waveSurFer = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const imgRef = useRef(null);
  const [bgColor, setBgColor] = useState("#ffffff");

  const params = useParams();

  const { data: track } = useQuery({
    queryKey: ["track", Number(params.id)],
    queryFn: () => fetchId("/tracks/getOneTrack/", Number(params.id)),
  });

  useEffect(() => {
    setTrackDetail(track?.getOneTrack);
  }, [track]);

  useEffect(() => {
    const handleReady = () => {
      setDuration(waveSurFer.current?.getDuration() ?? 0);
    };

    const handleAudioProcess = () => {
      setCurrentTime(waveSurFer.current?.getCurrentTime() ?? 0);
    };

    const handleFinish = () => {
      setPlaying(false);
      waveSurFer.current?.play();
      setPlaying(true);
    };

    if (waveformRef.current && trackDetail?.sound) {
      waveSurFer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#fff",
        progressColor: "#f50",
        dragToSeek: true,
        width: 820,
        height: 85,
        barGap: 1,
        barRadius: 20,
        barWidth: 2,
      });

      waveSurFer.current.load(trackDetail.sound);

      waveSurFer.current.on("ready", handleReady);
      waveSurFer.current.on("audioprocess", handleAudioProcess);
      waveSurFer.current.on("finish", handleFinish);
    }

    return () => {
      if (waveSurFer.current) {
        waveSurFer.current.un("audioprocess", handleAudioProcess);
        waveSurFer.current.un("ready", handleReady);
        waveSurFer.current.un("finish", handleFinish);
        waveSurFer.current.destroy();
        setPlaying(false);
      }
    };
  }, [trackDetail]);

  const handlePlayPause = () => {
    if (waveSurFer.current) {
      if (playing) {
        waveSurFer.current.pause();
      } else {
        waveSurFer.current.play();
      }
      setPlaying(!playing);
    }
  };

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      const fac = new FastAverageColor();
      const proxyUrl = `${trackDetail?.image}`;

      const image = new Image();
      image.crossOrigin = "Anonymous";
      image.src = proxyUrl;
      image.onload = () => {
        fac
          .getColorAsync(image)
          .then((color) => {
            setBgColor(color.hex);
          })
          .catch((e) => {
            console.error(e);
          });
      };
      image.onerror = (e) => {
        console.error("Image loading error:", e);
      };
    }
  }, [trackDetail]);

  const formatTime = (time: number) => {
    let min: number | string = Math.floor(time / 60);
    if (min < 10) {
      min = `${min}`;
    }
    let sec: string | number = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  return (
    <>
      <div className="h-[380px] border">
        <PopperWrapper>
          <div
            className="flex h-full flex-row-reverse justify-between"
            style={{ backgroundColor: bgColor }}
          >
            <div className="mx-2 my-[18px]">
              <img
                ref={imgRef}
                className="flex h-[340px] w-[340px] items-center justify-center"
                src={trackDetail?.image || trackDetail?.userData?.image}
                alt={trackDetail?.track_name}
              />
            </div>

            <div>
              <div className="flex w-full justify-between">
                <div className="flex w-[776px] gap-2 pb-[11rem] pl-[30px] pt-[30px]">
                  <div className="">
                    <button
                      onClick={handlePlayPause}
                      className="relative h-[60px] w-[60px] rounded-full border-[#f50] bg-[#f50]"
                    >
                      {playing ? (
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
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full">
                      <span className="h-[36.8px] bg-[#000000cc] px-2 py-1 text-2xl text-[#fff]">
                        {trackDetail?.track_name}
                      </span>
                    </div>
                    <div className="w-full">
                      <span className="h-[36.8px] w-full bg-[#000000cc] px-2 py-1 text-base text-[#ccc]">
                        {trackDetail?.userData?.username}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-7 text-white">
                  <span>3 months ago</span>
                </div>
              </div>
              <div className="ml-[30px] flex items-center">
                <div className="h-4 w-[26px] bg-black p-[2px] text-[10px] text-red-700">
                  <span>{formatTime(currentTime)}</span>
                </div>
                <div id="waveform" className="" ref={waveformRef}></div>
                <div className="h-4 bg-black p-[2px] text-[10px] text-[#999]">
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>
          </div>
        </PopperWrapper>
      </div>
    </>
  );
}

export default Home;
