'use client';
import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaHamburger, FaStop } from "react-icons/fa";

const TimeClock: React.FC = () => {
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startShift = () => {
    if (!intervalId) {
      const newStartTime = new Date();
      setStartTime(newStartTime);
      setIsOnBreak(false);
      const id = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
  };

  const outForMeal = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsOnBreak(true);
    }
  };

  const backFromMeal = () => {
    if (!intervalId && startTime) {
      const id = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsOnBreak(false);
    }
  };

  const endShift = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setStartTime(null);
    setElapsedTime(0);
    setIsOnBreak(false);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br dark:bg-boxdark-2 from-blue-500 via-indigo-600 to-purple-700">
      <div className="w-full max-w-2xl bg-white dark:bg-boxdark rounded-3xl shadow-xl p-8 relative">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Time Tracking Dashboard
        </h1>
        <div className="flex flex-col items-center">
          <div className="text-6xl font-bold text-indigo-600 mb-6">
            {formatTime(elapsedTime)}
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            {!startTime ? (
              <button
                onClick={startShift}
                className="bg-green-500 text-black   bg-primary  px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-green-600"
              >
                <FaPlay className="text-xl" />
                Start Shift
              </button>
            ) : isOnBreak ? (
              <button
                onClick={backFromMeal}
                className="bg-yellow-500 text-black bg-primary px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-yellow-600"
              >
                <FaPlay className="text-xl" />
                Back from Meal
              </button>
            ) : (
              <>
                <button
                  onClick={outForMeal}
                  className="bg-yellow-500 text-black bg-primary  px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-yellow-600"
                >
                  <FaHamburger className="text-xl" />
                  Out for Meal
                </button>
                <button
                  onClick={endShift}
                  className="bg-red-500 text-black  bg-primary  px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-red-600"
                >
                  <FaStop className="text-xl" />
                  End Shift
                </button>
              </>
            )}
          </div>
          {startTime && (
            <p className="text-gray-600 text-sm italic">
              Shift started at {startTime.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
      </div>
    </div>
  );
};

export default TimeClock;
