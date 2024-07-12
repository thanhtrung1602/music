import {
  SET_PLAY,
  SET_PAUSE,
  UPDATE_TIME,
  SET_CURRENT_TRACK,
  ActionTypes,
  SET_CURRENT_TIME,
  SET_DURATION,
  SET_REPEAT,
  TOGGLE_PLAYLIST,
} from "./actions";

interface State {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentTrackId: number | null;
  isRepeat: boolean;
  isPlaylist: boolean;
  trackId: number | null;
}

const initialState: State = {
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  currentTrackId: null,
  isRepeat: false,
  isPlaylist: false,
  trackId: null,
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_PLAY:
      return { ...state, isPlaying: action.isPlaying };
    case SET_PAUSE:
      return { ...state, isPlaying: action.isPlaying };
    case UPDATE_TIME:
      return { ...state, currentTime: action.payload };
    case SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload };
    case SET_DURATION:
      return { ...state, duration: action.payload };
    case SET_REPEAT:
      return { ...state, isRepeat: !state.isRepeat };
    case TOGGLE_PLAYLIST:
      return {
        ...state,
        isPlaylist: !state.isPlaylist,
        trackId: action.payload,
      };
    case SET_CURRENT_TRACK:
      return {
        ...state,
        currentTrackId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
