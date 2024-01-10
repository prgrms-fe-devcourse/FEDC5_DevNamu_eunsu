interface Props {
  comment: string;
}

const MyComment = ({ comment }: Props) => {
  return (
    <li>
      <div className="mb-2 text-lg font-normal">{comment}</div>
    </li>
  );
};

export default MyComment;
