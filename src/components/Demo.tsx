import usePostMessage from "@/apis/slackBot/usePostSlackMessage.ts";

const Demo = () => {
  const { sendMessageBySlackBot } = usePostMessage();

  const userId = "65981ab1a125832f20ab1315"; // admin 계정
  const mentionList = [{ name: "조재훈", userId, slackId: "U06DUUT9PA7" }];

  const handleSendMsg = () => {
    sendMessageBySlackBot({
      mentionedList: mentionList,
    });
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <button onClick={handleSendMsg} className="h-100pxr w-1/2 border-2">
        슬랙 봇 test
      </button>
    </div>
  );
};

export default Demo;
