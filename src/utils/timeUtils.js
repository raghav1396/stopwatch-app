export function getFormatedTime(secondsElapsed) {
  secondsElapsed = Math.floor(secondsElapsed)
  if (!secondsElapsed || secondsElapsed<=0) return "00:00:00";
  const seconds = `${secondsElapsed % 60}`.padStart(2, "0");
  const minutes = `${Math.floor(secondsElapsed / 60) % 60}`.padStart(2, "0");
  const hours = `${Math.floor(secondsElapsed / (60 * 60))}`.padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}


export function getTimestamp(){
  return Math.floor(Date.now() / 1000);
}