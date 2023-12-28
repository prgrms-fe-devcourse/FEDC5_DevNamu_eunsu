import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { Textarea } from "@/components/ui/textarea.tsx";

import { cn } from "@/lib/utils.ts";

/* TODO 12/28
 * 1. user 정보 중 userName props로 받기
 * 2. 있으면 기명 가능 - comments/create에 닉네임으로 comment 가능
 * 3. 없으면 개인정보 수정 모달
 * -
 *
 * */

interface CustomBody {
  content: string;
  userName: string | undefined;
}

interface CreatePostRequest {
  title: CustomBody;
  image: null;
  channelId: string;
}

interface CreateCommentRequest {
  comment: CustomBody;
  postId: string;
}

interface NotificationRequest {
  notificationType: "COMMENT" | "FOLLOW" | "LIKE" | "MESSAGE";
  notificationTypeId: string;
  userId: string;
  postId: string | null;
}

interface TextEditProps {
  contentType: "post" | "comment";
  submitType: "create" | "patch";
  userName: string | undefined;
  postId: string;
  channelId: string;
}

const TextEdit = ({ contentType, submitType, userName, postId, channelId }: TextEditProps) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { anonymous: true, content: "" },
  });

  // todo 12/28 post 업로드 / 수정
  const { mutate: postMutate } = useMutation({
    mutationKey: ["postRequest"],
    mutationFn:
      submitType === "create"
        ? async (data: CreatePostRequest) => await axios.post("/posts/create", data)
        : async (data: CreatePostRequest) => await axios.post("/posts/update", data),
  });

  const uploadPost = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const postReq = {
      title: {
        content,
        userName: anonymous ? undefined : userName,
      },
      image: null,
      channelId,
    };

    // 업로드
    if (submitType === "create") {
      postMutate(postReq);
    }
    // 수정
    else {
      const patchReq = {
        postId,
        ...postReq,
      };
      postMutate(patchReq);
    }
  };

  // todo 12/28 comment 업로드
  const { mutateAsync: commentMutate } = useMutation({
    mutationKey: ["commentRequest"],
    mutationFn: async (data: CreateCommentRequest) => {
      const res = await axios.post("/comments/create", data);
      return res.data;
    },
  });

  const { mutate: notificationMutate } = useMutation({
    mutationKey: ["notificationRequest"],
    mutationFn: async (data: NotificationRequest) =>
      await axios.post("/notifications/create", data),
  });
  const uploadComment = async ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    const commentReq = {
      comment: {
        content,
        userName: anonymous ? undefined : userName,
      },
      postId,
    };
    const commentRes = await commentMutate(commentReq);

    // todo 12/28 post 작성자에게 알림
    const notificationReq = {
      notificationType: "COMMENT",
      notificationTypeId: commentRes._id,
      userId: commentRes.author._id,
      postId,
    };
    notificationMutate(notificationReq as NotificationRequest);
  };

  const upload = ({ anonymous, content }: { anonymous: boolean; content: string }) => {
    contentType === "post"
      ? uploadPost({ anonymous, content })
      : uploadComment({ anonymous, content });
  };

  const handleCheckClick = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && !userName) {
      setValue("anonymous", true);
      // todo 12/28 모달 창과 연결
      alert("개인정보 수정 모달 창 띄우기");
    }
  };

  return (
    <form className="relative">
      <Textarea
        placeholder={`${contentType}을 작성해주세요.`}
        className="resize-none "
        {...register("content")}
      />
      <div className="absolute bottom-2 right-2 flex items-center">
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
          onClick={handleSubmit(upload)}
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl text-black",
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
