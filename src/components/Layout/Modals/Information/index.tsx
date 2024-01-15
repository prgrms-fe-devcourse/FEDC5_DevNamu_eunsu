import SimpleBaseModal from "../Base/modal";

import StrongText from "./StrongText";

interface Props {
  open: boolean;
  toggleOpen: (open: boolean) => void;
}

const InformationModal = ({ open, toggleOpen }: Props) => {
  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: toggleOpen,
      }}
      title="데나무숲 이용 안내"
    >
      <div className="mb-2 mt-4 text-center text-base text-gray-600">
        데브코스 간 생긴 일에 대해 익명으로 하고 싶었던
        <br />
        칭찬, 응원, 고해성사를 할 수 있는 <StrongText name="데나무숲" />를 소개합니다.
        <StrongText name="칭찬&응원 게시판 사용법" isTitle />
        소중한 사람들을 멘션하여
        <br />
        익명으로 감사 혹은 응원의 마음을 전달해보세요.
        <br />
        본인이 칭찬이나 응원을 받고 싶을 때도 사용할 수 있습니다!
        <StrongText name="무능 게시판 사용법" isTitle />
        본인이 무능하다고 여겨질 때,
        <br />
        혹은 아무 것도 안(못)해서 죄책감이 생겼을 때,
        <br />
        무능 게시판에서 고해성사를 통해
        <br />
        답답한 마음을 풀어내보세요.
        <StrongText name="개선 사항 게시판 사용법" isTitle />
        원하는 개선사항은
        <br />
        개선사항 채널에 편하게 익명으로 남겨주세요.
        <p className="mt-6 text-sm text-gray-400">
          데나무숲을 만든 사람들이 궁금하다면
          <br />
          <a
            className="text-lime-600 underline"
            target="_blank"
            href="https://github.com/prgrms-fe-devcourse/FEDC5_DevNamu_eunsu"
          >
            깃허브
          </a>
          를 방문해주세요!
        </p>
      </div>
    </SimpleBaseModal>
  );
};

export default InformationModal;
