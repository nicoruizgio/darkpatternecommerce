import { createContext, useState, useEffect, useContext } from "react";

const CountdownContext = createContext();

export function CountdownProvider({ children }) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("countdownTime");
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);

      const savedTimestamp = localStorage.getItem("countdownTimestamp");
      if (savedTimestamp) {
        const elapsedSeconds = Math.floor(
          (Date.now() - parseInt(savedTimestamp)) / 1000
        );

        let totalSeconds =
          parsedTime.hours * 3600 +
          parsedTime.minutes * 60 +
          parsedTime.seconds -
          elapsedSeconds;

        if (totalSeconds <= 0) {
          return { hours: 12, minutes: 0, seconds: 0 };
        }

        const hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        return { hours, minutes, seconds };
      }
    }

    return { hours: 12, minutes: 0, seconds: 0 };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (
          prevTime.hours === 0 &&
          prevTime.minutes === 0 &&
          prevTime.seconds === 0
        ) {
          return { hours: 12, minutes: 0, seconds: 0 };
        }

        let newHours = prevTime.hours;
        let newMinutes = prevTime.minutes;
        let newSeconds = prevTime.seconds - 1;

        if (newSeconds < 0) {
          newSeconds = 59;
          newMinutes -= 1;
        }

        if (newMinutes < 0) {
          newMinutes = 59;
          newHours -= 1;
        }

        const newTime = {
          hours: newHours,
          minutes: newMinutes,
          seconds: newSeconds,
        };

        localStorage.setItem("countdownTime", JSON.stringify(newTime));
        localStorage.setItem("countdownTimestamp", Date.now().toString());

        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    return String(time).padStart(2, "0");
  };

  return (
    <CountdownContext.Provider value={{ timeLeft, formatTime }}>
      {children}
    </CountdownContext.Provider>
  );
}

export function useCountdown() {
  return useContext(CountdownContext);
}
