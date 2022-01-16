/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';

export const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<any>(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

const lsBus: any = {};
const ssBus: any = {};

/**
 * Redraw all components that have a hook to localStorage with the given key.
 * @param {string} key
 * @param {*} newValue
 */
const notifyLSBus = (key: string, newValue: any) => {
  if (!lsBus || !lsBus[key]) {
    return;
  }
  Object.values(lsBus[key]).forEach((u: any) => u(newValue));
};

/**
 * Redraw all components that have a hook to sessionStorage with the given key.
 * @param {string} key
 * @param {*} newValue
 */
const notifySSBus = (key: string, newValue: any) => {
  if (!ssBus || !ssBus[key]) {
    return;
  }
  Object.values(ssBus[key]).forEach((u: any) => u(newValue));
};

/**
 * Hooks into localStorage. The value will be taken from localStorage, if the key exists there.
 * If not, the value will use the `initialValue` data. Use the setFunction to update the value inside
 * localStorage _and_ notify all components that use the same hook that the value behind the key has changed.
 *
 * You can pass whatever is JSON encodable to the setFunction - it will take care of storing it correctly.
 * @param {string} key
 * @param {*} [initialValue=null]
 * @returns {Array} [value, setFunction]
 */
export const useLocalStorage = (key: string, initialValue: any = null) => {
  let defaultValue;
  try {
    defaultValue = localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) ?? '')
      : initialValue;
  } catch (e) {
    defaultValue = initialValue;
  }
  const [value, setValue] = useState(defaultValue);
  const componentId = useState(Math.random().toString())[0];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    lsBus[key] = lsBus[key] || {};
    lsBus[key][componentId] = setValue;
    return () => {
      delete lsBus[componentId];
    };
  });

  return [
    value,
    (newValue: any) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      notifyLSBus(key, newValue);
    },
  ];
};

export const useSessionStorage = (key: string, initialValue: any) => {
  let defaultValue;
  try {
    defaultValue = sessionStorage.getItem(key)
      ? JSON.parse(sessionStorage.getItem(key) ?? '')
      : initialValue;
  } catch (e) {
    defaultValue = initialValue;
  }
  const [value, setValue] = useState(defaultValue);
  const componentId = useState(Math.random().toString())[0];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    ssBus[key] = ssBus[key] || {};
    ssBus[key][componentId] = setValue;
    return () => {
      delete ssBus[componentId];
    };
  });

  return [
    value,
    (newValue: any) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
      notifySSBus(key, newValue);
    },
  ];
};

export const useUnload = (fn: any) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};
