import { parseTitleOrComment } from "@/utils/parsingJson";

interface Props {
  comment: string;
}

const MyComment = ({ comment }: Props) => {
  const { content } = parseTitleOrComment(comment);

  return (
    <li>
      <div className="mb-2 pb-3 text-lg font-normal">{content}</div>
    </li>
  );
};

export default MyComment;
