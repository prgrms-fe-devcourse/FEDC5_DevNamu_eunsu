import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent } from "react";

import useUploadPost from "@/hooks/useUploadPost.ts";
import useUploadComment from "@/hooks/useUploadComment.ts";
import useParentWidth from "@/hooks/useParentWidth.ts";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils";
import MentionInput from "@/components/Common/Mention/MentionInput.tsx";

export type ContentType = "post" | "comment";
export type SubmitType = "create" | "patch";
interface Props {
  isMention: boolean;
  contentType: ContentType;
  submitType: SubmitType;
  nickName: string | undefined;
  postId: string;
  channelId: string;
}

// todo [24/1/2] : contentType, submitType에 따라 props값 다르게 넘겨주기
const TextEdit = ({ isMention, contentType, submitType, nickName, postId, channelId }: Props) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { anonymous: true, content: "" },
  });

  const { uploadPost } = useUploadPost({ submitType, nickName, channelId, postId });
  const { uploadComment } = useUploadComment({ nickName, postId });

  const { ref, parentWidth } = useParentWidth();

  const handleUpload = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    contentType === "post"
      ? uploadPost({ anonymous, content })
      : uploadComment({ anonymous, content });

    setValue("content", "");
  };

  const handleCheckClick = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && !nickName) {
      setValue("anonymous", true);
      // todo 12/28 모달 창과 연결

      return;
    }
  };

  return (
    <div className="fixed bottom-0 flex flex-col gap-2" style={{ width: parentWidth }} ref={ref}>
      {isMention && <MentionInput />}
      <form className="relative">
        <Textarea
          placeholder={`${contentType}을 작성해주세요.`}
          className="resize-none"
          {...register("content")}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <label
            className="flex cursor-pointer items-center gap-2 rounded-xl border p-3"
            htmlFor="anonymous"
          >
            <input
              type="checkbox"
              id="anonymous"
              {...register("anonymous")}
              onClick={handleCheckClick}
            />
            <p className="text-gray-500">익명</p>
          </label>
          <button
            onClick={handleSubmit(handleUpload)}
            className={cn(
              "flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-black",
              watch("content") ? "bg-green-600" : "",
            )}
          >
            <SendHorizontal className="h-10 w-10 fill-amber-50 stroke-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TextEdit;
