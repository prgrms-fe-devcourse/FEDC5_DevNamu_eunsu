import { useCreatePostMutate, usePatchPostMutate } from "@/apis/post/usePostMutate.ts";
import { SubmitType } from "@/components/Common/TextEdit.tsx";

interface Props {
  submitType: SubmitType;
  userName: string | undefined;
  channelId: string;
  postId: string;
}

const useUploadPost = ({ submitType, userName, channelId, postId }: Props) => {
  const { mutate: createPostMutate } = useCreatePostMutate();
  const { mutate: patchPostMutate } = usePatchPostMutate();

  const uploadPost = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const postReq = {
      title: {
        content,
        userName: anonymous ? undefined : userName,
      },
      image: null,
      channelId,
    };

    if (submitType === "create") {
      createPostMutate(postReq);
    } else {
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
