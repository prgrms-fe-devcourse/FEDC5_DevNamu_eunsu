import { log } from "./logger";

export const parseFullName = (fullName: string): { name: string; nickname: string } => {
  try {
    return JSON.parse(fullName);
  } catch (error) {
    log("error", "Error parsing fullName:", error);
    return { name: "", nickname: "프롱이" };
  }
};

export const parseTitleOrComment = (
  title: string,
): { content: string; nickname: string; mentionedList: string } => {
  try {
    return JSON.parse(title);
  } catch (error) {
    log("error", "Error parsing title:", error);
    return { content: "", nickname: "익명의 프롱이", mentionedList: "" };
  }
};
