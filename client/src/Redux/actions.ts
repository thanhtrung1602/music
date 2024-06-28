export const SET_PLAY = "SET_PLAY";
export const SET_PAUSE = "SET_PAUSE";
export const UPDATE_TIME = "UPDATE_TIME";
export const SET_CURRENT_TRACK = "SET_CURRENT_TRACK";

interface SetPlayAction {
  type: typeof SET_PLAY;
}

interface SetPauseAction {
  type: typeof SET_PAUSE;
}

interface UpdateTimeAction {
  type: typeof UPDATE_TIME;
  payload: number;
}

interface SetCurrentTrackAction {
  type: typeof SET_CURRENT_TRACK;
  payload: number;
}

export type ActionTypes =
  | SetPlayAction
  | SetPauseAction
  | UpdateTimeAction
  | SetCurrentTrackAction;

export const setPlay = () => ({ type: SET_PLAY });
export const setPause = () => ({ type: SET_PAUSE });
export const updateTime = (time: number) => ({
  type: UPDATE_TIME,
  payload: time,
});
export const setCurrentTrack = (trackId: number) => ({
  type: SET_CURRENT_TRACK,
  payload: trackId,
});
