import { z } from "zod";
import { isAxiosError } from "axios";

import { Button } from "@/components/ui/button";

import SimpleBaseForm from "../Base/form";
import SimpleBaseModal from "../Base/modal";

import { REGISTER_FIELDS, REGISTER_FIELDS_SCHEMA } from "./config";

import useRegister from "@/apis/auth/useRegister";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openLoginModal: (open: boolean) => void;
}

const RegisterModal = ({ open, toggleOpen, openLoginModal }: Props) => {
  const register = useRegister();

  const handleLoginClick = () => {
    toggleOpen(!open);
    openLoginModal(true);
  };

  const handleSubmit = (registerInfo: z.infer<typeof REGISTER_FIELDS_SCHEMA>) => {
    const { email, name, nickname, password } = registerInfo;
    const fullName = JSON.stringify({ name, nickname: nickname || "프롱이" });
    register.mutate({ email, fullName, password });
    if (register.isSuccess) handleLoginClick();
    if (register.isError) {
      // TODO: 에러 모달 처리 (2024-01-01)
      if (isAxiosError(register.error)) {
        const { response } = register.error;
        alert(response?.data || "An unknown error occurred");
      } else alert("An unknown error occurred");
    }
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
