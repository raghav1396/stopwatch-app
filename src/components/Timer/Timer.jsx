import { useEffect, useState } from "react";
import { getFormatedTime } from "../../utils/timeUtils";

// eslint-disable-next-line react/prop-types
function Timer({ startTime, paused }) {
  const [timeElapsed, setTimeElapsed] = useState(startTime);
  const secondsElapsed = Math.floor(timeElapsed - startTime);
  useEffect(() => {
    if (paused) return;
    const timeoutId = setTimeout(
      () => setTimeElapsed((prevSeconds) => prevSeconds + 1),
      1000
    );
    return () => clearTimeout(timeoutId);
  }, [secondsElapsed, paused]);

  useEffect(() => setTimeElapsed(startTime), [startTime]);

  return <>{getFormatedTime(timeElapsed - startTime)}</>;
}

export default Timer;
