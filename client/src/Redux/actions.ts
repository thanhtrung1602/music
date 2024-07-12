export const SET_PLAY = "SET_PLAY";
export const SET_PAUSE = "SET_PAUSE";
export const UPDATE_TIME = "UPDATE_TIME";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";
export const SET_CURRENT_TIME = "SET_CURRENT_TIME";
export const SET_DURATION = "SET_DURATION";
export const SET_REPEAT = "SET_REPEAT";
export const TOGGLE_PLAYLIST = "TOGGLE_PLAYLIST";
interface SetPlayAction {
  type: typeof SET_PLAY;
  isPlaying: boolean;
}

interface SetPauseAction {
  type: typeof SET_PAUSE;
  isPlaying: boolean;
}

interface SetRepeat {
  type: typeof SET_REPEAT;
}

interface UpdateTimeAction {
  type: typeof UPDATE_TIME;
  payload: number;
}

interface SetCurrentTrackAction {
  type: typeof SET_CURRENT_TRACK;
  payload: number;
}

interface SetCurrentTime {
  type: typeof SET_CURRENT_TIME;
  payload: number;
}

interface SetDuration {
  type: typeof SET_DURATION;
  payload: number;
}

interface TogglePlaylist {
  type: typeof TOGGLE_PLAYLIST;
  payload: number;
}

export type ActionTypes =
  | SetPlayAction
  | SetPauseAction
  | UpdateTimeAction
  | SetCurrentTrackAction
  | SetCurrentTime
  | SetDuration
  | SetRepeat
  | TogglePlaylist;

export const setPlay = () => ({
  type: SET_PLAY,
  isPlaying: true,
});
export const setPause = () => ({
  type: SET_PAUSE,
  isPlaying: false,
});
export const updateTime = (time: number) => ({
  type: UPDATE_TIME,
  payload: time,
});
export const setCurrentTrack = (trackId: number) => ({
  type: SET_CURRENT_TRACK,
  payload: trackId,
});

export const setCurrentTime = (time: number) => ({
  type: SET_CURRENT_TIME,
  payload: time,
});

export const setDuration = (duration: number) => ({
  type: SET_DURATION,
  payload: duration,
});

export const setRepeat = () => ({
  type: SET_REPEAT,
});

export const togglePlaylist = (trackId: number) => ({
  type: TOGGLE_PLAYLIST,
  payload: trackId,
});
