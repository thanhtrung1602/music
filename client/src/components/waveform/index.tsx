import WaveSurfer from "wavesurfer.js";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useEffect, useState } from "react";
import instance from "~/services/customize-axios";
import { ITrack } from "~/types/track";
import { useDispatch, useSelector } from "react-redux";
import {
  setPlay,
  setPause,
  setCurrentTime,
  setDuration,
} from "~/Redux/actions";
import { fetchPost } from "~/Api";

type Wave = {
  wc: string;
  pc: string;
  w: number;
  h: number;
  bg?: number;
  br?: number;
  bw?: number;
};

interface WaveformProps {
  waveformRef: React.MutableRefObject<HTMLDivElement | null>;
  id: number;
  wave: Wave;
}

function useWaveform({ waveformRef, id, wave }: WaveformProps) {
  const queryClient = useQueryClient();
  const waveSurferRef = useRef<WaveSurfer | null>(null);
  const [trackDetail, setTrackDetail] = useState<ITrack | null>(null);
  const { isPlaying, currentTime, duration, isRepeat } = useSelector(
    (state: {
      isPlaying: boolean;
      currentTime: number;
      duration: number;
      isRepeat: boolean;
    }) => state,
  );
  const dispatch = useDispatch();
  const { mutate } = fetchPost();
  useEffect(() => {
    instance.get(`/tracks/getOneTrack/${id}`).then((res) => {
      setTrackDetail(res.data.getOneTrack);
    });
  }, [id, setTrackDetail]);

  useEffect(() => {
    const data = {
      id,
    };
    const handleReady = () => {
      if (waveSurferRef.current) {
        const duration = waveSurferRef.current.getDuration() ?? 0;
        dispatch(setDuration(duration));
      }
    };

    const handleAudioProcess = () => {
      if (waveSurferRef.current) {
        const currentTime = waveSurferRef.current.getCurrentTime() ?? 0;
        dispatch(setCurrentTime(currentTime));
        localStorage.setItem("currentTime", String(currentTime));
      }
    };

    const handleFinish = () => {
      mutate(
        { url: "/tracks/trackListen", data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["/tracks/countListen/"],
            });
          },
        },
      );

      if (waveSurferRef.current) {
        if (isRepeat) {
          waveSurferRef.current.seekTo(0);
          waveSurferRef.current.play();
          dispatch(setPlay());
        } else {
          waveSurferRef.current.seekTo(0);
          dispatch(setPause());
        }
      }
    };

    if (waveformRef.current && trackDetail?.sound) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: `${wave.wc}`,
        progressColor: `${wave.pc}`,
        dragToSeek: true,
        width: wave.w,
        height: wave.h,
        barGap: wave.bg,
        barRadius: wave.br,
        barWidth: wave.bw,
      });

      waveSurferRef.current.load(trackDetail.sound);
      waveSurferRef.current.on("ready", handleReady);
      waveSurferRef.current.on("audioprocess", handleAudioProcess);
      waveSurferRef.current.on("finish", handleFinish);
    }

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.un("audioprocess", handleAudioProcess);
        waveSurferRef.current.un("finish", handleFinish);
        waveSurferRef.current.destroy();
      }
    };
  }, [trackDetail, id, dispatch, setCurrentTime, setDuration, waveformRef]);

  useEffect(() => {
    if (waveSurferRef.current) {
      if (isPlaying) {
        waveSurferRef.current.pause();
      } else {
        waveSurferRef.current.play();
      }
      isPlaying ? waveSurferRef.current.play() : waveSurferRef.current.pause();
    }
  }, [isPlaying, waveSurferRef, id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch(setPause());
    } else {
      dispatch(setPlay());
      localStorage.setItem("idTrack", String(id));
    }
    dispatch(isPlaying ? setPause() : setPlay());
  };

  useEffect(() => {
    const seekToTime = () => {
      if (waveSurferRef.current) {
        const waveSurferCurrentTime =
          waveSurferRef.current.getCurrentTime() ?? 0;
        const tolerance = 0.5; // 0.5 seconds tolerance
        if (Math.abs(currentTime - waveSurferCurrentTime) > tolerance) {
          waveSurferRef.current.seekTo(currentTime / duration);
        }
      }
    };

    seekToTime();
  }, [currentTime, duration]);

  const handleClickOnWaveform = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!waveformRef.current) return;
    const waveformRect = waveformRef.current.getBoundingClientRect();
    const clickX = event.clientX - waveformRect.left;
    const waveformWidth = waveformRect.width;
    const clickedTime = (clickX / waveformWidth) * duration;
    waveSurferRef.current?.seekTo(clickedTime / duration);
    dispatch(setCurrentTime(clickedTime));
    localStorage.removeItem("setTimeClick");
    localStorage.setItem("setTimeClick", String(clickedTime));
  };

  return {
    isPlaying,
    trackDetail,
    duration,
    currentTime,
    handlePlayPause,
    handleClickOnWaveform,
  };
}

export default useWaveform;
