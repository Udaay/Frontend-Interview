import React, { useState, useEffect, useCallback } from 'react';

/**
 * Custom React hook for countdown functionality.
 *
 * @param {Date} endTime - The end time for the countdown.
 * @param {Object} options - Options for the countdown.
 * @param {number} options.interval - The interval in milliseconds at which the countdown should tick.
 * @param {function} options.onTick - A callback function to be called on each tick of the countdown.
 * @param {function} options.onComplete - A callback function to be called when the countdown reaches zero /countdown completes.
 * @returns {number} The remaining time in seconds.
 */
function useCountdown(endTime, options) {
  const { interval, onTick, onComplete } = options;

  const calculateRemainingTime = useCallback(() => {
    const currentTime = new Date();
    const remainingTime = Math.max(0, Math.floor((endTime - currentTime) / 1000));
    return remainingTime;
  }, [endTime]);

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      const newRemainingTime = calculateRemainingTime();
      setRemainingTime(newRemainingTime);

      if (onTick && typeof onTick === 'function') {
        onTick();
      }

      if (newRemainingTime <= 0) {
        clearInterval(timer);
        if (onComplete && typeof onComplete === 'function') {
          onComplete(endTime);
        }
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [calculateRemainingTime, endTime, interval, onTick, onComplete]);

  return remainingTime;
}

export default useCountdown;
