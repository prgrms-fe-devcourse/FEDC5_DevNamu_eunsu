import sendMessageBySlackBot from "@/lib/sendMessageBySlackBot.ts";

const Demo = () => {
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
