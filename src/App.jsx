import "./App.css";
import Timer from "./components/Timer/Timer";
import { useTimer } from "./contexts/TimerContext";

function App() {
  const { start, stop, pause, reset, timestamp, stopTime, isPaused } = useTimer();
  return (
    <>
    <div className={`${stopTime? "stopped": ""} timer`}>

      <Timer paused={isPaused} startTime={timestamp} />
    </div>
      {stopTime && <div className={stopTime? "stopped time": ""}>Timer stopped at: {stopTime}</div>}
      <div className="btns">
        <button onClick={isPaused ? start : pause}>
          {isPaused ? "Start" : "Pause"}
        </button>
        {timestamp && <button onClick={stop}>Stop</button>}
        <button onClick={reset}>Reset</button>

      </div>
    </>
  );
}

export default App;
