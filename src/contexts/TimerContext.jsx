import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { getFormatedTime, getTimestamp } from "../utils/timeUtils";

const TimerContext = createContext();

const initialState = {
  timestamp: null,
  stopTime: null,
  isPaused: true,
  lastPauseAt: null,
  pausedSeconds: 0,
};

const actionTypes = {
  STOP: "STOP",
  RESET: "RESET",
  PAUSE: "PAUSE",
  START: "START",
};

function reducer(state, action) {
  const { type } = action;
  switch (type) {
    case actionTypes.START: {
      const timestamp = state.timestamp ?? getTimestamp();
      const pausedSeconds =
        (state.lastPauseAt ? getTimestamp() - state.lastPauseAt : 0) +
        state.pausedSeconds;
      return {
        ...initialState,
        isPaused: false,
        stopTime: null,
        timestamp,
        pausedSeconds,
      };
    }
    case actionTypes.PAUSE:
      return { ...state, isPaused: true, lastPauseAt: getTimestamp() };
    case actionTypes.STOP: {
      const pausedSeconds = (state.lastPauseAt ? getTimestamp() - state.lastPauseAt : 0) + state.pausedSeconds;
      const timeDel = getTimestamp() - pausedSeconds;
      const stopTime = getFormatedTime(timeDel - state.timestamp);
      return { ...initialState, stopTime };
    }
    case actionTypes.RESET:
      return { ...initialState };
    default:
      return state;
  }
}

// eslint-disable-next-line react/prop-types
function TimerProvider({ children }) {
  const [{ timestamp, stopTime, isPaused }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const dispatchStart = useCallback(() => dispatch({ type: actionTypes.START }), []);
  const dispatchPause = useCallback(() => dispatch({ type: actionTypes.PAUSE }), []);
  const dispatchStop = useCallback(() => dispatch({ type: actionTypes.STOP }), []);
  const dispatchReset = useCallback(() => dispatch({ type: actionTypes.RESET }), []);

  const value = useMemo(
    () => ({
      start: dispatchStart,
      stop: dispatchStop,
      pause: dispatchPause,
      reset: dispatchReset,
      timestamp,
      stopTime,
      isPaused,
    }),
    [
      timestamp,
      stopTime,
      isPaused,
      dispatchStart,
      dispatchPause,
      dispatchReset,
      dispatchStop,
    ]
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

function useTimer() {
  const timerContext = useContext(TimerContext);
  if (timerContext === undefined)
    throw new Error(
      "time context was accesed outside the scope of timerContext.Provider"
    );
  return timerContext;
}

export { TimerProvider, useTimer };
