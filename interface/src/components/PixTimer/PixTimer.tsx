import { useState, useEffect } from "react";
import { Text } from "@mantine/core";

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
