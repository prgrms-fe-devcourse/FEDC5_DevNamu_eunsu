import { z } from "zod";
import { useCallback, useEffect } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { REGISTER_FIELDS, REGISTER_FIELDS_SCHEMA } from "./config";

import useUpdateUserList from "@/hooks/api/useUpdateUserList.ts";
import useUserListByDB from "@/hooks/api/useUserListByDB.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openLoginModal: (open: boolean) => void;
}

const RegisterModal = ({ open, toggleOpen, openLoginModal }: Props) => {
  const { updateUserList, isRegisterSuccess, isRegisterError, registerError } = useUpdateUserList();
  const { userListByDB } = useUserListByDB();

  const handleLoginClick = useCallback(() => {
    toggleOpen(false);
    openLoginModal(true);
  }, [toggleOpen, openLoginModal]);

  useEffect(() => {
    if (isRegisterSuccess) handleLoginClick();
    if (isRegisterError) {
      // TODO: 에러 모달 처리 (2024-01-01)
      if (isAxiosError(registerError)) {
        alert(registerError.response?.data || "An unknown error occurred");
      } else alert("An unknown error occurred");
    }
  }, [isRegisterSuccess, isRegisterError, registerError, handleLoginClick]);

  const handleSubmit = async (registerInfo: z.infer<typeof REGISTER_FIELDS_SCHEMA>) => {
    const { email, name, nickname, password } = registerInfo;

    if (!userListByDB.find((user) => user.name === name)) {
      toast.warning(AUTH_ERROR_MESSAGE.UNKNOWN_NAME);
      return;
    }
    const fullName = { name, nickname: nickname || ANONYMOUS_NICKNAME };
    toast.promise(updateUserList({ email, fullName, password }), {
      loading: "잠시만 기다려주세요...",
      success: () => {
        return "회원가입에 성공했습니다.";
      },
      error: () => {
        return "회원가입에 실패했습니다. 다시 시도해주세요.";
      },
    });
  };

  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
      }}
      title="회원가입"
      header={
        <>
          <span>이미 회원이신가요?</span>
          <Button variant="link" onClick={handleLoginClick}>
            로그인하기
          </Button>
        </>
      }
    >
      <SimpleBaseForm
        fields={REGISTER_FIELDS}
        validationSchema={REGISTER_FIELDS_SCHEMA}
        onSubmit={handleSubmit}
        submitText="회원가입"
      />
    </SimpleBaseModal>
  );
};

export default RegisterModal;
