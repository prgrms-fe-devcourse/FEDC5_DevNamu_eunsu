import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import EditorTextAreaPresentational from "@/components/common/editor/EditorTextArea.tsx";
import CreateSubmit from "@/components/common/editor/CreateSubmit.tsx";

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

  // return <EditorTextAreaPresentational {...createThreadProps} onSubmit={handleSubmit} />;
  return (
    <EditorTextAreaPresentational>
      <EditorTextAreaPresentational.Mention />
      <EditorTextAreaPresentational.TextArea
        {...createThreadProps}
        onSubmit={handleSubmit}
        submitButton={<CreateSubmit />}
      />
    </EditorTextAreaPresentational>
  );
};

export default CreateThreadContainer;
