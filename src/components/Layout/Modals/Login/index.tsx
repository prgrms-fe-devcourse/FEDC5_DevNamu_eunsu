import { z } from "zod";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { LOGIN_FIELDS, LOGIN_FIELDS_SCHEMA } from "./config";

import useLogin from "@/apis/auth/useLogin";
import { AUTH_ERROR_MESSAGE, AUTH_ERROR_RESPONSE } from "@/constants/authError";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openRegisterModal: (open: boolean) => void;
}

const LoginModal = ({ open, toggleOpen, openRegisterModal }: Props) => {
  const { login } = useLogin({ toggleOpen });

  const handleRegisterClick = () => {
    toggleOpen(!open);
    openRegisterModal(true);
  };

  const handleSubmit = (loginInfo: z.infer<typeof LOGIN_FIELDS_SCHEMA>) => {
    toast.promise(login(loginInfo), {
      loading: "잠시만 기다려주세요...",
      success: ({ user: { fullName } }) => {
        const { nickname } = JSON.parse(fullName);
        return `어서오세요, ${nickname}님!`;
      },
      error: (error: AxiosError) => {
        if (error?.response?.data === AUTH_ERROR_RESPONSE.LOGIN_FAILED) {
          return AUTH_ERROR_MESSAGE.LOGIN_FAILED;
        }
        return AUTH_ERROR_MESSAGE.SERVER_ERROR;
      },
    });
  };

  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
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
