import EditorTextArea from "../common/Editor/textArea";

import useUpdateThread from "@/hooks/api/useUpdateThread";

interface Props {
  disableMention?: boolean;
  postId: string;
  channelId: string;
}

const ThreadUpdateEditor = ({ disableMention, postId, channelId }: Props) => {
  // 변하는 prop은 여기서 직접 제공
  const updateThread = useUpdateThread(channelId, postId);

  return <EditorTextArea disableMention={disableMention} onSubmit={updateThread} />;
};

export default ThreadUpdateEditor;
