import axios from "axios";

const sendMessageBySlackBot = async ({ userName }: { userName: string }) => {
  const URL = "https://hooks.slack.com/services/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";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios({
      method: "post",
      url: "https://cors-anywhere.herokuapp.com/" + URL, // url에 webhookurl 을 넣어주세요.
      headers,
      data: {
        text: `<@${userName}>님! 데브나무에 오신 것을 환영합니다! 휘식님!!`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default sendMessageBySlackBot;
