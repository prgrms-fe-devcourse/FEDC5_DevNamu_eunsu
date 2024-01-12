import * as Sentry from "@sentry/react";

import { log } from "./logger";

export const getLocalStorage = <T>(key: string, defaultValue: T) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    log("error", "Error reading from localStorage:", error);
    Sentry.captureException(error);
  }
  return defaultValue;
};

export const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    log("error", "Error writing to localStorage:", error);
    Sentry.captureException(error);
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    log("error", "Error removing from localStorage:", error);
    Sentry.captureException(error);
  }
};
