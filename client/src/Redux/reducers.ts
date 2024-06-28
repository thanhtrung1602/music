import {
  SET_PLAY,
  SET_PAUSE,
  UPDATE_TIME,
  SET_CURRENT_TRACK,
  ActionTypes,
} from "./actions";

interface State {
  isPlaying: boolean;
  currentTime: number;
  currentTrackId: number | null;
}

const initialState: State = {
  isPlaying: false,
  currentTime: 0,
  currentTrackId: null,
};

const reducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case SET_PLAY:
      return { ...state, isPlaying: true };
    case SET_PAUSE:
      return { ...state, isPlaying: false };
    case UPDATE_TIME:
      return { ...state, currentTime: action.payload };
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
