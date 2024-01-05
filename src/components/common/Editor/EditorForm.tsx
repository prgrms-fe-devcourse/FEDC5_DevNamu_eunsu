import { SendHorizontal } from "lucide-react";
import { ChangeEvent, useState } from "react";

import { Textarea } from "@/components/ui/textarea.tsx";

import useGlobalModal from "./useGlobalModal";

import { cn } from "@/lib/utils";
import useGetUserInfo from "@/apis/auth/useGetUserInfo";

export interface EditorFormValues {
  anonymous: boolean;
  nickname: string;
  content: string;
}

interface Props {
  onSubmit: (values: EditorFormValues) => void;
}

const EditorForm = ({ onSubmit }: Props) => {
  // 사용자 상태와 Modal 트리거는 서버/전역 상태에서 받아옴
  const { user, isLoggedIn, hasNickname } = useGetUserInfo();
  const { openLoginModal, openUserChangeModal } = useGlobalModal();

  // 폼 요소는 2개 뿐이어서 useForm은 제거
  const [isAuthorAnonymous, setAuthorAnonymous] = useState(false);
  const [content, setContent] = useState("");
  const hasContent = content.length > 0;

  const toggleAnonymous = () => {
    if (!isLoggedIn) {
      return openLoginModal();
    }
    if (!hasNickname) {
      return openUserChangeModal();
    }
    setAuthorAnonymous(!isAuthorAnonymous);
  };

  const checkUserLoggedIn = () => {
    if (!isLoggedIn) {
      openLoginModal();
    }
  };

  const handleContentUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({
      anonymous: isAuthorAnonymous,
      nickname: user?.nickname,
      content,
    });
  };

  return (
    <>
      <Textarea
        value={content}
        onFocus={checkUserLoggedIn}
        onChange={handleContentUpdate}
        placeholder="내용을 작성해주세요"
        className="resize-none"
      />
      <div className="absolute flex items-center gap-2 bottom-2 right-2">
        <label
          className="flex items-center gap-2 p-3 border cursor-pointer rounded-xl"
          htmlFor="anonymous"
        >
          <input
            type="checkbox"
            id="anonymous"
            checked={isAuthorAnonymous}
            onClick={toggleAnonymous}
          />
          <p className="text-gray-500">익명</p>
        </label>
        <button
          onClick={handleSubmit}
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
