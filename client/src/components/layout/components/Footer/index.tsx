import { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import icon from "~/assets/img/icon";
import instance from "~/services/customize-axios";
import { ITrack } from "~/types/track";

function Footer() {
  const waveformRef = useRef<HTMLDivElement>(null);
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const waveSurFer = useRef<WaveSurfer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    instance.get(`/tracks/getOneTrack/${1}`).then((res) => {
      setTrackDetail(res.data.getOneTrack);
    });
  }, [1]);

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
        waveColor: "#cccccc",
        progressColor: "#f50",
        dragToSeek: true,
        width: 512,
        height: 1,
      });

      waveSurFer.current.load(trackDetail.sound);
      waveSurFer.current.on("ready", handleReady);
      waveSurFer.current.on("audioprocess", handleAudioProcess);
      waveSurFer.current.on("finish", handleFinish);
    }

    return () => {
      if (waveSurFer.current) {
        waveSurFer.current.un("audioprocess", handleAudioProcess);
        waveSurFer.current.un("finish", handleFinish);
        waveSurFer.current.destroy();
        setPlaying(false);
      }
    };
  }, [trackDetail, 1]);

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
    <div className="fixed bottom-0 flex h-12 w-full items-center justify-center border-t border-[#cecece] bg-[#f2f2f2]">
      <div className="mt-3 flex w-[1258px] items-center justify-center gap-3">
        <div className="flex items-center gap-5">
          <button>
            <img src={icon.skipLeft} alt="" />
          </button>
          <button onClick={handlePlayPause}>
            <img src={icon.playBold} alt="" />
          </button>
          <button>
            <img src={icon.skipRight} alt="" />
          </button>
          <button>
            <img src={icon.repeatTrack} alt="" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[26px]p-[2px] h-4 text-[10px] text-[#ff5500]">
            <span>{formatTime(currentTime)}</span>
          </div>
          <div id="waveform" className="" ref={waveformRef}></div>
          <div className="h-4 p-[2px] text-[10px] text-[#ff5500]">
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <div>
          <img src={icon.volume} alt="" />
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <div>
              <img
                className="h-[30px] w-[30px]"
                src="https://res.cloudinary.com/dxuknuxer/image/upload/v1719574841/sound/nhunao.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col text-[#333]">
              <span className="text-xs">Wxrdie</span>
              <span className="text-xs">
                Như Nào Cũng Được! [Prod. by Machiot]
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button>
              <img src={icon.heart} alt="" />
            </button>
            <button>
              <img src={icon.userPlusB} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
