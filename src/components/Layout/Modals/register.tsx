import { Button } from "@/components/ui/button";

import SimpleModalFrame from "./base";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openLoginModal: (open: boolean) => void;
}

const REGISTER_FIELDS = [
  {
    id: "name",
    type: "name",
    label: "이름",
    autoFocus: true,
  },
  {
    id: "email",
    type: "email",
    label: "이메일",
  },
  {
    id: "password",
    type: "password",
    label: "비밀번호",
  },
];

const RegisterModal = ({ open, toggleOpen, openLoginModal }: Props) => {
  const handleLoginClick = () => {
    toggleOpen(!open);
    openLoginModal(true);
  };

  return (
    <SimpleModalFrame
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
      }}
      title="회원가입"
      fields={REGISTER_FIELDS}
      header={
        <>
          <span>이미 회원이신가요?</span>
          <Button variant="link" onClick={handleLoginClick}>
            로그인하기
          </Button>
        </>
      }
      footer={<Button type="submit">회원가입</Button>}
    />
  );
};

export default RegisterModal;
