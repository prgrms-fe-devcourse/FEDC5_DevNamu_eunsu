import { parseTitleOrComment } from "@/utils/parsingJson";

interface Props {
  comment: string;
}

const MyComment = ({ comment }: Props) => {
  const { content } = parseTitleOrComment(comment);

  return (
    <li>
      <div className="mb-2 pb-3 text-lg font-normal text-content-5">{content}</div>
    </li>
  );
};

export default MyComment;
