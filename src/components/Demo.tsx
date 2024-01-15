import usePostMessage from "@/apis/slackBot/usePostMessage.ts";

const Demo = () => {
  const { sendMessageBySlackBot } = usePostMessage();

  const handleSendMsg = () => {
    sendMessageBySlackBot({ userName: "wognskec" });
  };
  return (
    <div>
      <button onClick={handleSendMsg}>test</button>
    </div>
  );
};

export default Demo;
