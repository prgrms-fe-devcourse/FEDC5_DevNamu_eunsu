import { useForm } from "react-hook-form";
import { SendHorizontal } from "lucide-react";
import { FormEvent, KeyboardEvent, useState } from "react";
import { useOverlay } from "@toss/use-overlay";

import { Textarea } from "@/components/ui/textarea.tsx";

import LoginModal from "../../Layout/Modals/Login";
import ProfileModal from "../../Layout/Modals/Profile";

import { cn } from "@/lib/utils.ts";
import MentionInput from "@/components/common/mention/MentionInput.tsx";
import { ANONYMOUS_NICKNAME } from "@/constants/commonConstants.ts";
import { UserDBProps } from "@/hooks/api/useUserListByDB.ts";
import useToast from "@/hooks/common/useToast.ts";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";

export interface FormValues {
  anonymous: boolean;
  content: string;
}

interface Props {
  isMention: boolean;
  nickname: string;
  isLogin: boolean;
  onSubmit: (params: FormSubmitProps) => void;
  prevContent?: string;
  onEditClose?: () => void;
  authorNickname?: string;
}

const EditorTextArea = ({
  isMention,
  nickname,
  isLogin,
  onSubmit,
  prevContent,
  onEditClose,
  authorNickname,
}: Props) => {
  const { showToast } = useToast();
  const { open } = useOverlay();

  const [mentionedList, setMentionedList] = useState<Array<UserDBProps>>([]);

  const { register, handleSubmit, watch, setValue, getValues } = useForm({
    defaultValues: {
      anonymous: authorNickname ? authorNickname === ANONYMOUS_NICKNAME : true,
      content: prevContent || "",
    },
  });

  const handleUpload = (formValues: FormValues) => {
    if (!formValues.content.trim()) return;

    if (!isLogin) {
      showToast({
        message: "로그인 한 유저만 글 쓰기가 가능합니다.",
        actionLabel: "로그인",
        onActionClick: () => {
          gtag("event", "conversion_익명_사용자가_로그인_요청을_수락");
          open(({ isOpen, close }) => {
            return <LoginModal open={isOpen} close={close} />;
          });
        },
      });
      return;
    }

    onSubmit({ formValues, mentionedList });
    setMentionedList([]);
    setValue("content", "");
    onEditClose?.();
    gtag("event", `ui사용_에디터_쓰기`);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.nativeEvent.isComposing) return;
    if (event.shiftKey && event.key === "Enter") return;

    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit(handleUpload)();
    }
  };

  const handleClickCheckBox = (e: FormEvent<HTMLInputElement>) => {
    if (!e.currentTarget.checked && nickname === ANONYMOUS_NICKNAME) {
      gtag("event", "ui사용_익명_여부_토글");
      setValue("anonymous", true);
      open(({ isOpen, close }) => {
        gtag("event", "ui사용_사용자_정보_변경_모달_띄우기");
        return <ProfileModal open={isOpen} close={close} />;
      });
      return;
    }
  };

  return (
    <div className="flex w-full flex-col gap-1">
      {isMention && <MentionInput mentionedList={mentionedList} onChoose={setMentionedList} />}

      <form className="relative">
        <Textarea
          placeholder={isLogin ? `내용을 작성해주세요.` : "로그인이 필요합니다."}
          className="resize-none overflow-hidden pr-200pxr text-base text-content-5"
          {...register("content")}
          onKeyDown={handleKeydown}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-layer-5 p-3 hover:bg-layer-2">
            <input type="checkbox" {...register("anonymous")} onClick={handleClickCheckBox} />
            <p className="text-content-4">익명</p>
          </label>
          {onEditClose ? (
            <div className="flex items-center gap-2 text-content-4">
              <button className="rounded-sm bg-layer-3 p-3 hover:bg-layer-4" onClick={onEditClose}>
                취소
              </button>
              <button
                onClick={handleSubmit(handleUpload)}
                className={cn(
                  "rounded-sm border border-layer-2 p-3 text-content-5",
                  watch("content")
                    ? "border-blue-100 bg-blue-100 dark:text-blue-600"
                    : "cursor-not-allowed",
                )}
              >
                확인
              </button>
            </div>
          ) : (
            <button
              onClick={handleSubmit(handleUpload)}
              className={cn(
                "relative h-12 w-12 cursor-pointer rounded-xl bg-layer-4 text-content-1",
                watch("content") && "bg-blue-200 text-blue-600",
              )}
            >
              <SendHorizontal
                className={cn(
                  "absolute left-4pxr top-1 h-10 w-10 stroke-2",
                  watch("content") && "fill-blue-300",
                )}
              />
            </button>
          )}
        </div>
      </form>
      <span
        className={cn(
          "text-right text-sm text-content-1",
          getValues("content") ? "visible" : "invisible",
        )}
      >
        <b>Shift + Enter</b>키를 눌러 새 행을 추가합니다
      </span>
    </div>
  );
};

export default EditorTextArea;
