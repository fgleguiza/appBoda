import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = new Date(2026, 8, 13, 18, 0, 0);

  const getTime = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Item = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 flex items-center justify-center text-xl font-bold rounded-xl bg-white/30 backdrop-blur-md">
        {value.toString().padStart(2, "0")}
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );

  // 🎉 mensaje cuando llega el día
  if (
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0
  ) {
    return (
      <p className="mt-6 text-lg font-medium text-center">
        🎉 ¡Hoy es el gran día!
      </p>
    );
  }

  return (
    <div className="flex gap-4 mt-6 justify-center">
      <Item value={timeLeft.days} label="Días" />
      <Item value={timeLeft.hours} label="Hs" />
      <Item value={timeLeft.minutes} label="Min" />
      <Item value={timeLeft.seconds} label="Seg" />
    </div>
  );
}
