import { z } from "zod";
import { AxiosError } from "axios";
import * as Sentry from "@sentry/react";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { LOGIN_FIELDS, LOGIN_FIELDS_SCHEMA } from "./config";

import usePostLogin from "@/apis/auth/usePostLogin";
import {
  AUTH_ERROR_MESSAGE,
  AUTH_ERROR_RESPONSE,
  AUTH_SUCCESS_MESSAGE,
} from "@/constants/toastMessage";
import useToast from "@/hooks/common/useToast";
import useModal from "@/hooks/common/useModal";

interface Props {
  open: boolean;
  close: () => void;
}

const LoginModal = ({ open, close }: Props) => {
  const { login } = usePostLogin();
  const { showPromiseToast } = useToast();
  const { openRegisterModal } = useModal();

  const handleRegisterClick = () => {
    close();
    openRegisterModal();
  };

  const handleSubmit = (loginInfo: z.infer<typeof LOGIN_FIELDS_SCHEMA>) => {
    showPromiseToast({
      promise: login(loginInfo),
      messages: {
        success: ({ user: { fullName } }) => {
          close();
          Sentry.captureMessage("retention - 로그인", "info");
          const { nickname } = JSON.parse(fullName);
          return AUTH_SUCCESS_MESSAGE.LOGIN(nickname);
        },
        error: (error: AxiosError) => {
          if (error?.response?.data === AUTH_ERROR_RESPONSE.LOGIN_FAILED) {
            return AUTH_ERROR_MESSAGE.LOGIN_FAILED;
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
        onOpenChange: close,
      }}
      title="로그인"
      header={
        <>
          <span>혹시 회원이 아니신가요?</span>
          <Button variant="link" onClick={handleRegisterClick}>
            회원가입하기
          </Button>
        </>
      }
    >
      <SimpleBaseForm
        fields={LOGIN_FIELDS}
        validationSchema={LOGIN_FIELDS_SCHEMA}
        onSubmit={handleSubmit}
        submitText="로그인"
      />
    </SimpleBaseModal>
  );
};

export default LoginModal;
