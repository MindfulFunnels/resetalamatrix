import React, { useEffect, useState } from "react";

const Countdown = ({ deadline }: { deadline: string }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(deadline);
    const timeRemaining = targetDate.getTime() - now.getTime();

    if (timeRemaining <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
        live: true,
      };
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

    return {
      days: formatNumber(days),
      hours: formatNumber(hours),
      minutes: formatNumber(minutes),
      seconds: formatNumber(seconds),
      live: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft.live) {
    return (
      <div className='flex items-center justify-center w-full text-lg font-bold'>
        ¡Estamos en vivo!
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center w-full  gap-6 count-down-main'>
      {["days", "hours", "minutes", "seconds"].map((unit, index) => (
        <div key={index} className='timer'>
          <div className="pr-1.5 pl-2 relative bg-primary w-max before:contents-[''] before:absolute before:h-full before:w-0.5 before:top-0 before:left-1/2 before:-translate-x-1/2 before:bg-white before:z-10">
            <h3
              className={`countdown-element ${unit} font-manrope font-semibold text-2xl text-white tracking-[15.36px] max-w-[44px] text-center relative z-20`}
            >
              {timeLeft[unit as keyof typeof timeLeft]}
            </h3>
          </div>
          <p className='w-full mt-1 text-sm font-normal text-center text-primary'>
            {unit}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
