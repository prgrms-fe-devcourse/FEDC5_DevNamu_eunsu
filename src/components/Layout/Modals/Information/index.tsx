import SimpleBaseModal from "../Base/modal";

import { REPOSITORY_URL } from "@/constants/commonConstants";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  close: (open: boolean) => void;
}

const titleCSS = "mb-2 mt-5 text-base font-bold text-lime-600";

const InformationModal = ({ open, close }: Props) => {
  return (
    <SimpleBaseModal
      dialogOptions={{
        open,
        onOpenChange: close,
      }}
      title="데나무숲 이용 안내"
    >
      <div className="mb-2 mt-4 text-justify text-base text-gray-600">
        <p>
          데브코스 간 생긴 일에 대해 익명으로 하고 싶었던 칭찬, 응원, 고해성사를 할 수 있는
          <strong className={titleCSS}> 데나무숲</strong>을 소개합니다.
        </p>
        <strong className={cn(titleCSS, "block")}>칭찬&응원 게시판 이용법</strong>
        <p>
          소중한 사람들을 멘션하여 익명으로 감사 혹은 응원의 마음을 전달해보세요. 본인이 칭찬이나
          응원을 받고 싶을 때도 사용할 수 있습니다!
        </p>
        <strong className={cn(titleCSS, "block")}>무능 게시판 이용법</strong>
        <p>
          본인이 무능하다고 여겨질 때, 혹은 아무 것도 안(못)해서 죄책감이 생겼을 때, 무능 게시판에서
          고해성사를 통해 답답한 마음을 풀어내보세요.
        </p>
        <strong className={cn(titleCSS, "block")}>잡담 게시판 이용법</strong>
        <p>아무 말을 편하게 올려보세요 :D</p>
        <strong className={cn(titleCSS, "block")}>개선 사항 게시판 이용법</strong>
        <p>원하는 개선사항은 개선사항 채널에 편하게 익명으로 남겨주세요.</p>
        <p className="mt-6 text-center text-sm text-gray-400">
          데나무숲을 만든 사람들이 궁금하다면{" "}
          <a className="text-lime-600 underline" target="_blank" href={REPOSITORY_URL}>
            깃허브
          </a>
          를 방문해주세요!
        </p>
      </div>
    </SimpleBaseModal>
  );
};

export default InformationModal;
