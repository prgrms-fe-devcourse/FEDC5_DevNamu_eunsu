import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import CreateSubmit from "@/components/common/editor/textArea/CreateSubmit.tsx";
import EditorContextProvider from "@/components/common/editor/presenter/EditorContextProvider.tsx";

interface Props {
  isMention?: boolean;
  nickname: string;
  isLogin: boolean;
  channelId: string;
}
const CreateThreadContainer = (createThreadProps: Props) => {
  const { nickname, channelId, isMention = true } = createThreadProps;

  const { uploadThread } = useCreateThread({
    nickname,
    channelId,
  });

  const handleSubmit = (params: FormSubmitProps) => {
    uploadThread(params);
  };

  return (
    <EditorContextProvider>
      {isMention && <EditorContextProvider.Mention />}
      <EditorContextProvider.TextArea
        {...createThreadProps}
        onSubmit={handleSubmit}
        placeholder="스레드를 작성해주세요."
        submitArea={(props) => <CreateSubmit {...props} />}
      />
    </EditorContextProvider>
  );
};

export default CreateThreadContainer;
