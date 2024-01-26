import useCreateThread, { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import CreateSubmit from "@/components/common/editor/submit/CreateSubmit.tsx";
import EditorContextProvider from "@/components/common/editor/presenter/EditorContextProvider.tsx";

interface Props {
  isMention: boolean;
  nickname: string;
  isLogin: boolean;
  channelId: string;
}
const CreateThreadContainer = (createThreadProps: Props) => {
  const { nickname, channelId } = createThreadProps;

  const { uploadThread } = useCreateThread({
    nickname,
    channelId,
  });

  const handleSubmit = (params: FormSubmitProps) => {
    uploadThread(params);
  };

  return (
    <EditorContextProvider>
      {createThreadProps.isMention && <EditorContextProvider.Mention />}
      <EditorContextProvider.TextArea
        {...createThreadProps}
        onSubmit={handleSubmit}
        submitButton={(props) => <CreateSubmit {...props} />}
      />
    </EditorContextProvider>
  );
};

export default CreateThreadContainer;
