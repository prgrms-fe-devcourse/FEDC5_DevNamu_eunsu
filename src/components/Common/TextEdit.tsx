import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent } from "react";

import useUploadPost from "@/hooks/useUploadPost.tsx";
import useUploadComment from "@/hooks/useUploadComment.tsx";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils";

export type ContentType = "post" | "comment";
export type SubmitType = "create" | "patch";
interface Props {
  contentType: ContentType;
  submitType: SubmitType;
  userName: string | undefined;
  postId: string;
  channelId: string;
}

const TextEdit = ({ contentType, submitType, userName, postId, channelId }: Props) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { anonymous: true, content: "" },
  });

  const { uploadPost } = useUploadPost({ submitType, userName, channelId, postId });
  const { uploadComment } = useUploadComment({ userName, postId });

  const handleUpload = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    contentType === "post"
      ? uploadPost({ anonymous, content })
      : uploadComment({ anonymous, content });
  };

  const handleCheckClick = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && !userName) {
      setValue("anonymous", true);
      // todo 12/28 모달 창과 연결
      alert("개인정보 수정 모달 창 띄우기");
      return;
    }
  };

  return (
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
  );
};

export default TextEdit;
