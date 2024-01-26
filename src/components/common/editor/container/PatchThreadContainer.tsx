import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import useChangeThread from "@/hooks/api/useChangeThread.ts";
import EditorContextProvider from "@/components/common/editor/presenter/EditorContextProvider.tsx";
import PatchSubmit from "@/components/common/editor/textArea/PatchSubmit.tsx";

interface Props {
  nickname: string;
  postId: string;
  isLogin: boolean;
  channelId: string;
  prevContent: string;
  onEditClose: () => void;
  authorNickname: string;
}

const PatchThreadContainer = (patchThreadProps: Props) => {
  const { nickname, postId, channelId, onEditClose } = patchThreadProps;

  const { changeThread } = useChangeThread({ nickname, postId, channelId });

  const handleSubmit = (params: FormSubmitProps) => {
    changeThread(params);
  };

  return (
    <EditorContextProvider>
      <EditorContextProvider.Mention />
      <EditorContextProvider.TextArea
        {...patchThreadProps}
        onSubmit={handleSubmit}
        placeholder="스레드를 수정해주세요."
        submitArea={(props) => <PatchSubmit {...props} onEditClose={onEditClose} />}
      />
    </EditorContextProvider>
  );
};

export default PatchThreadContainer;
