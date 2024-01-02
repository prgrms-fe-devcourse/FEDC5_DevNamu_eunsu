export const parseFullName = (fullName: string) => {
  try {
    return JSON.parse(fullName);
  } catch (error) {
    console.error("Error parsing fullName:", error);
    return { name: "", nickname: "프롱이" };
  }
};
