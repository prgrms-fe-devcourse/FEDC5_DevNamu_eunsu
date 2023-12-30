import { z } from "zod";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { LOGIN_FIELDS, LOGIN_FIELDS_SCHEMA } from "./config";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openRegisterModal: (open: boolean) => void;
}

const LoginModal = ({ open, toggleOpen, openRegisterModal }: Props) => {
  const handleRegisterClick = () => {
    toggleOpen(!open);
    openRegisterModal(true);
  };

  const handleSubmit = (values: z.infer<typeof LOGIN_FIELDS_SCHEMA>) => {
    // TODO: [2023-12-30] 로그인 API 연동하기
    console.log(values);
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
