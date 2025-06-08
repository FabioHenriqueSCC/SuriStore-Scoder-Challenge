import { useState, useEffect } from "react";
import { Text } from "@mantine/core";

/**
 * PixTimer component for displaying a countdown timer.
 *
 * This component renders a countdown timer that starts at 15 minutes (900 seconds) and decrements every second.
 * When the timer reaches zero, it stops updating. The timer is displayed in the format `MM:SS`.
 * The color of the timer changes based on the remaining time (violet while time is left, gray when time is up).
 *
 * @returns {JSX.Element} The rendered countdown timer.
 *
 * @example
 * // Example usage:
 * // <PixTimer />
 */
export const PixTimer = () => {
  const initialTime = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <Text fw={700} size="xl" c={timeLeft > 0 ? "violet.7" : "gray.6"}>
      {minutes}:{seconds}
    </Text>
  );
};
