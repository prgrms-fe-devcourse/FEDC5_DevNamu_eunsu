import { Button } from "@/components/ui/button";

import SimpleModalFrame from "./base";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
  openRegisterModal: (open: boolean) => void;
}

const LOGIN_FIELDS = [
  {
    id: "email",
    type: "email",
    label: "이메일",
    autoFocus: true,
  },
  {
    id: "password",
    type: "password",
    label: "비밀번호",
  },
];

const LoginModal = ({ open, toggleOpen, openRegisterModal }: Props) => {
  const handleRegisterClick = () => {
    toggleOpen(!open);
    openRegisterModal(true);
  };

  return (
    <SimpleModalFrame
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
      }}
      title="로그인"
      fields={LOGIN_FIELDS}
      header={
        <>
          <span>혹시 회원이 아니신가요?</span>
          <Button variant="link" onClick={handleRegisterClick}>
            회원가입하기
          </Button>
        </>
      }
      footer={<Button type="submit">로그인</Button>}
    />
  );
};

export default LoginModal;
