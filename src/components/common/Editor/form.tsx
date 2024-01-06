import { SendHorizontal } from "lucide-react";
import { ChangeEvent, FocusEvent, useState } from "react";

import { Textarea } from "@/components/ui/textarea.tsx";

import ThreadCommonPayload from "@/types/ThreadCommonPayload";

import useGlobalModal from "./useGlobalModal";

import { cn } from "@/lib/utils";
import useGetUserInfo from "@/apis/auth/useGetUserInfo";

interface Props {
  initialText?: string;
  onSubmit: (payload: ThreadCommonPayload) => Promise<void>;
  placeholderText?: string;
}

const EditorForm = ({
  initialText = "",
  onSubmit,
  placeholderText = "내용을 입력해주세요",
}: Props) => {
  // 사용자 상태와 Modal 트리거는 서버/전역 상태에서 받아옴
  const { user, isLoggedIn, hasNickname } = useGetUserInfo();
  const { openLoginModal, openUserChangeModal } = useGlobalModal();

  // 폼 요소는 2개 뿐이어서 useForm은 제거
  const [isAuthorAnonymous, setAuthorAnonymous] = useState(false);
  const [content, setContent] = useState(initialText);
  const hasContent = content.length > 0;
  const emptyUserInput = () => setContent("");

  const toggleAnonymous = () => {
    if (!isLoggedIn) {
      return openLoginModal();
    }
    if (!hasNickname) {
      return openUserChangeModal();
    }
    setAuthorAnonymous(!isAuthorAnonymous);
  };

  const checkUserLoggedIn = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (!isLoggedIn) {
      e.target.blur();
      openLoginModal();
    }
  };

  const handleContentUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    await onSubmit({
      anonymous: isAuthorAnonymous,
      nickname: user?.nickname,
      content,
    });

    emptyUserInput();
  };

  return (
    <>
      <Textarea
        value={content}
        onFocus={checkUserLoggedIn}
        onChange={handleContentUpdate}
        placeholder={placeholderText}
        className="resize-none"
      />
      <div className="absolute flex items-center gap-2 bottom-2 right-2">
        <label className="flex items-center gap-2 p-3 border cursor-pointer rounded-xl">
          <input type="checkbox" checked={isAuthorAnonymous} onChange={toggleAnonymous} />
          <p className="text-gray-500">익명</p>
        </label>
        <button
          onClick={handleSubmit}
          // valiation 규칙을 받거나 (trim, min-length, max-length, ...)
          // validation callback을 받아서 실행하거나 (이 경우 공통으로 쓸 callback도 여기서 제공하면 좋을 듯)
          disabled={!hasContent}
          className={cn(
            "flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl text-black",
            hasContent && "bg-green-600",
          )}
        >
          <SendHorizontal className="w-10 h-10 stroke-2 fill-amber-50" />
        </button>
      </div>
    </>
  );
};

export default EditorForm;
