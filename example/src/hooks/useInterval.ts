import { useRef, useEffect } from 'react';

export const useInterval = (callback: () => void, interval: number, shouldRun: boolean) => {
    const callbackRef = useRef(callback);

    // Set callbackRef to the latest callback if callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback])

    // Set up the interval
    useEffect(() => {

        // Don't schedule if shouldRun is false.
        if (!shouldRun) {
            return;
        }

        const id = setInterval(() => callbackRef.current(), interval);

        return () => clearInterval(id);
    }, [interval, shouldRun])
};