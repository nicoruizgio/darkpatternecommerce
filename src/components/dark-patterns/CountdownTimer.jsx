import { useCountdown } from "../../context/CountdownContext";

export default function CountdownTimer() {
  const { timeLeft, formatTime } = useCountdown();

  return (
    <div className="text-red-600 font-semibold text-sm flex items-center mb-2">
      <span className="animate-pulse mr-1">⏱️</span>
      <span>Offer ends in {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>
    </div>
  );
}