import { z } from "zod";
import { useOverlay } from "@toss/use-overlay";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";
import RegisterModal from "../Register";

import { LOGIN_FIELDS, LOGIN_FIELDS_SCHEMA } from "./config";

import usePostLogin from "@/apis/auth/usePostLogin";

interface Props {
  open: boolean;
  close: () => void;
}

const LoginModal = ({ open, close }: Props) => {
  const { login } = usePostLogin();
  const { open: openModal } = useOverlay();

  const handleRegisterClick = () => {
    close();
    openModal(({ isOpen, close }) => {
      return <RegisterModal open={isOpen} close={close} />;
    });
  };

  const handleSubmit = (loginInfo: z.infer<typeof LOGIN_FIELDS_SCHEMA>) => {
    login(loginInfo);
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
