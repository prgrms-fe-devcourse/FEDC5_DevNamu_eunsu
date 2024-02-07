import EditorTextAreaPresentational from "@/components/common/editor/EditorTextAreaPresentational.tsx";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import useChangeThread from "@/hooks/api/useChangeThread.ts";

interface Props {
  isMention: boolean;
  nickname: string;
  postId: string;
  isLogin: boolean;
  channelId: string;
  prevContent?: string;
  onEditClose?: () => void;
  authorNickname?: string;
}
const PatchThreadContainer = (patchThreadProps: Props) => {
  const { changeThread } = useChangeThread({
    nickname: patchThreadProps.nickname,
    postId: patchThreadProps.postId,
    channelId: patchThreadProps.channelId,
  });
  const handleSubmit = (params: FormSubmitProps) => {
    changeThread(params);
  };

  return <EditorTextAreaPresentational {...patchThreadProps} onSubmit={handleSubmit} />;
};

export default PatchThreadContainer;
