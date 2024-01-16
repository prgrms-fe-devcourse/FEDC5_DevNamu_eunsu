import { parseTitleOrComment } from "@/utils/parsingJson";

interface Props {
  comment: string;
}

const MyComment = ({ comment }: Props) => {
  const { content } = parseTitleOrComment(comment);

  return (
    <li>
      <div className="text-content-5 mb-2 text-lg font-normal">{content}</div>
    </li>
  );
};

export default MyComment;
