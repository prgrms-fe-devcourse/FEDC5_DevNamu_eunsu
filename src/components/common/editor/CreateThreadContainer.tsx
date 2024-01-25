import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import CreateSubmit from "@/components/common/editor/CreateSubmit.tsx";
import EditorContextProvider from "@/components/common/editor/EditorContextProvider.tsx";

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

  return (
    <EditorContextProvider>
      <EditorContextProvider.Mention />
      <EditorContextProvider.TextArea
        {...createThreadProps}
        onSubmit={handleSubmit}
        submitButton={(props) => <CreateSubmit {...props} />}
      />
    </EditorContextProvider>
  );
};

export default CreateThreadContainer;
