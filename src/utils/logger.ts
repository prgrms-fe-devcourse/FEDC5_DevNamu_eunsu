/**
 * production env가 아닐 때만 출력
 */
// eslint-disable-next-line
export const log = (type: "info" | "error", ...args: any[]) => {
  if (import.meta.env.PROD) {
    return;
  }

  if (type === "error") {
    console.error(...args);
    return;
  }

  console.log(...args);
};
