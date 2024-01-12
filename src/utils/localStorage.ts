import * as Sentry from "@sentry/react";

export const getLocalStorage = <T>(key: string, defaultValue: T) => {
  try {
    const storedValue = localStorage.getItem(key);

    if (storedValue !== null) {
      return JSON.parse(storedValue);
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    Sentry.captureException(error);
  }
  return defaultValue;
};

export const setLocalStorage = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
    Sentry.captureException(error);
  }
};

export const removeLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
    Sentry.captureException(error);
  }
};
