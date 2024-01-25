import { useForm, UseFormHandleSubmit } from "react-hook-form";
import { FormEvent, KeyboardEvent, useContext } from "react";
import { useOverlay } from "@toss/use-overlay";

import { Textarea } from "@/components/ui/textarea.tsx";

import LoginModal from "../../Layout/Modals/Login";
import ProfileModal from "../../Layout/Modals/Profile";

import { cn } from "@/lib/utils.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/commonConstants.ts";
import useToast from "@/hooks/common/useToast.ts";
import { FormSubmitProps } from "@/hooks/api/useCreateThread.ts";
import { EditorContext } from "@/components/common/editor/EditorContextProvider.tsx";

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

interface TextAreaProps extends Props {
  submitButton?: ({
    handleSubmit,
    isValues,
  }: {
    handleSubmit: UseFormHandleSubmit<FormValues>;
    isValues: boolean;
  }) => JSX.Element;
}
export default function ContentTextArea({
  nickname,
  isLogin,
  onSubmit,
  prevContent,
  onEditClose,
  authorNickname,
  submitButton,
}: TextAreaProps) {
  const { showToast } = useToast();
  const { open } = useOverlay();

  const { register, handleSubmit, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      anonymous: authorNickname ? authorNickname === ANONYMOUS_NICKNAME : true,
      content: prevContent || "",
    },
  });

  const { mentionedList, setMentionedList } = useContext(EditorContext);

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
    <>
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
          {submitButton?.({
            handleSubmit: () => handleSubmit(handleUpload),
            isValues: !!getValues("content"),
          })}
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
    </>
  );
}
