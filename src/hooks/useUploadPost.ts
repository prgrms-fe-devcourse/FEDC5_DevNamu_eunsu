import { useCreatePostMutate, usePatchPostMutate } from "@/apis/post/usePostMutate.ts";
import { SubmitType } from "@/components/common/EditorTextArea.tsx";

interface Props {
  submitType: SubmitType;
  nickName: string | undefined;
  channelId: string;
  postId?: string;
}

const useUploadPost = ({ submitType, nickName, channelId, postId }: Props) => {
  const { mutate: createPostMutate } = useCreatePostMutate();
  const { mutate: patchPostMutate } = usePatchPostMutate();

  const uploadPost = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const postReq = {
      title: JSON.stringify({
        content,
        nickName: anonymous ? undefined : nickName,
      }),
      image: null,
      channelId,
    };

    if (submitType === "create") {
      createPostMutate(postReq);
    } else {
      /// todo [24/1/2] : create, patch 분기 처리 리펙토링 할 것
      if (!postId) {
        console.error("postId 가 필요합니다.");
        return;
      }
      const patchReq = {
        postId,
        ...postReq,
      };
      patchPostMutate(patchReq);
    }
  };
  return { uploadPost };
};

export default useUploadPost;
