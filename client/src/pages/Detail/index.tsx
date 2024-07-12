import { useState, useRef, useEffect, useMemo } from "react";
import { FastAverageColor } from "fast-average-color";
import moment from "moment";
import { useParams } from "react-router-dom";
import icon from "~/assets/img/icon";
import { Wrapper as PopperWrapper } from "~/components/Popper";
import useWaveform from "~/components/waveform";

function Home() {
  const params = useParams();
  const waveformRefHome = useRef<HTMLDivElement>(null);
  const imgRef = useRef(null);
  const [formattedTime, setFormattedTime] = useState("");

  const [bgColor, setBgColor] = useState("#ffffff");
  const id = Number(params.id);

  const wave = useMemo(
    () => ({
      wc: "#fff",
      pc: "#f50",
      w: 800,
      h: 85,
      bg: 1,
      br: 20,
      bw: 2,
    }),
    [],
  );

  const {
    isPlaying,
    trackDetail,
    duration,
    currentTime,
    handlePlayPause,
    handleClickOnWaveform,
  } = useWaveform({
    waveformRef: waveformRefHome,
    id,
    wave,
  });

  useEffect(() => {
    if (trackDetail?.createdAt) {
      setFormattedTime(moment(trackDetail.createdAt).fromNow());
    }
  }, [trackDetail]);

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
            <div className="mx-[18px] my-[18px]">
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
                      className="relative h-[60px] w-[60px] rounded-full border-[#f50] bg-[#f50] outline-none"
                    >
                      <img
                        className="absolute left-2/4 top-2/4 h-3/5 w-2/5 -translate-x-2/4 -translate-y-2/4"
                        src={isPlaying ? icon.pause : icon.playTrack}
                        alt="pause/play"
                      />
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
                  <span>{formattedTime}</span>
                </div>
              </div>
              <div className="ml-[30px] flex items-center">
                <div className="h-4 w-[26px] bg-black p-[2px] text-[10px] text-red-700">
                  <span>{formatTime(currentTime)}</span>
                </div>
                <div
                  id="waveform"
                  className=""
                  ref={waveformRefHome}
                  onClick={handleClickOnWaveform}
                ></div>
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
