import { useEffect, useMemo, useRef, useState } from "react";

import icon from "~/assets/img/icon";
import useWaveform from "~/components/waveform";
import { ITrack } from "~/types/track";
import instance from "~/services/customize-axios";

function Footer() {
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const waveformRefFooter = useRef<HTMLDivElement>(null);
  const idTrack = localStorage.getItem("idTrack");
  const getCurrentTime = localStorage.getItem("currentTime");
  const id = idTrack ? Number(idTrack) : NaN;
  const currentTime = getCurrentTime ? parseFloat(getCurrentTime) : NaN;

  useEffect(() => {
    instance.get(`/tracks/getOneTrack/${id}`).then((res) => {
      setTrackDetail(res.data.getOneTrack);
    });
  }, [id, setTrackDetail]);

  const wave = useMemo(
    () => ({
      wc: "#cccccc",
      pc: "#f50",
      w: 512,
      h: 1,
    }),
    [],
  );

  const { isPlaying, duration, handlePlayPause, handleClickOnWaveform } =
    useWaveform({
      waveformRef: waveformRefFooter,
      id,
      wave,
    });

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
    <div className="fixed bottom-0 z-50 flex h-12 w-full items-center justify-center border-t border-[#cecece] bg-[#f2f2f2]">
      <div className="mt-3 flex w-[1519.2px] items-center justify-center gap-9 leading-3">
        <div className="flex items-center gap-5">
          <button>
            <img src={icon.skipLeft} alt="" />
          </button>
          <button onClick={handlePlayPause}>
            <img src={isPlaying ? icon.pauseBold : icon.playBold} alt="" />
          </button>
          <button>
            <img src={icon.skipRight} alt="" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-[26px] p-[2px] text-[10px] text-[#ff5500]">
            <span className="w-5">{formatTime(currentTime)}</span>
          </div>
          <div
            id="waveform"
            className=""
            ref={waveformRefFooter}
            onClick={handleClickOnWaveform}
          ></div>
          <div className="h-4 p-[2px] text-[10px] text-[#ff5500]">
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex w-[350px] items-center gap-2">
            <div>
              <img
                className="h-[30px] w-[30px]"
                src={trackDetail?.image}
                alt=""
              />
            </div>
            <div className="flex flex-col text-[#333]">
              <span className="text-xs">{trackDetail?.userData?.username}</span>
              <span className="text-xs">{trackDetail?.track_name}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
