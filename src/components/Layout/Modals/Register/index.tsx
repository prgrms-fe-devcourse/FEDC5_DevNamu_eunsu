import { z } from "zod";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { REGISTER_FIELDS, REGISTER_FIELDS_SCHEMA } from "./config";

import useUpdateUserList from "@/hooks/api/useUpdateUserList.ts";
import useUserListByDB from "@/hooks/api/useUserListByDB.ts";
import { ANONYMOUS_NICKNAME } from "@/constants/anonymousNickname.ts";
import {
  AUTH_ERROR_MESSAGE,
  AUTH_ERROR_RESPONSE,
  AUTH_SUCCESS_MESSAGE,
} from "@/constants/toastMessage";
import useToast from "@/hooks/common/useToast";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openLoginModal: (open: boolean) => void;
}

const RegisterModal = ({ open, toggleOpen, openLoginModal }: Props) => {
  const { updateUserList, isRegisterSuccess } = useUpdateUserList();
  const { userListByDB } = useUserListByDB();
  const { showPromiseToast } = useToast();

  const handleLoginClick = useCallback(() => {
    toggleOpen(false);
    openLoginModal(true);
  }, [toggleOpen, openLoginModal]);

  useEffect(() => {
    if (isRegisterSuccess) handleLoginClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegisterSuccess]);

  const handleSubmit = async (registerInfo: z.infer<typeof REGISTER_FIELDS_SCHEMA>) => {
    const { email, name, nickname, password } = registerInfo;

    if (!userListByDB.find((user) => user.name === name)) {
      toast.warning(AUTH_ERROR_MESSAGE.UNKNOWN_NAME);
      return;
    }
    const fullName = { name, nickname: nickname || ANONYMOUS_NICKNAME };
    showPromiseToast({
      promise: updateUserList({ email, fullName, password }),
      messages: {
        success: (name) => {
          // TODO: handleLoginClick()이 여기서 안 먹는 이유 찾기 (2024-01-10)
          return AUTH_SUCCESS_MESSAGE.REGISTER(name);
        },
        error: (error: AxiosError) => {
          if (error?.response?.data === AUTH_ERROR_RESPONSE.ALREADY_USED_EMAIL) {
            return AUTH_ERROR_MESSAGE.ALREADY_USED_EMAIL;
          }
          return AUTH_ERROR_MESSAGE.SERVER_ERROR;
        },
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
