import EditorTextAreaPresentational from "@/components/common/editor/EditorTextAreaPresentational.tsx";
import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";

interface Props {
  isMention: boolean;
  nickname: string;
  isLogin: boolean;
  channelId: string;
}
const CreateThreadContainer = (createThreadProps: Props) => {
  const { uploadThread } = useCreateThread({
    nickname: createThreadProps.nickname,
    channelId: createThreadProps.channelId,
  });
  const handleSubmit = (params: FormSubmitProps) => {
    uploadThread(params);
  };

  return <EditorTextAreaPresentational {...createThreadProps} onSubmit={handleSubmit} />;
};

export default CreateThreadContainer;
