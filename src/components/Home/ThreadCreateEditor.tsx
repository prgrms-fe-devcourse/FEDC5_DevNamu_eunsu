import EditorTextArea from "../common/Editor/EditorTextArea";

import useCreateThread from "@/hooks/api/useCreateThread";

interface Props {
  disableMention?: boolean;
  channelId: string;
}

const ThreadCreateEditor = ({ disableMention, channelId }: Props) => {
  // 변하는 prop은 여기서 직접 제공
  const { uploadThread } = useCreateThread({ channelId });

  return <EditorTextArea disableMention={disableMention} onSubmit={uploadThread} />;
};

export default ThreadCreateEditor;
