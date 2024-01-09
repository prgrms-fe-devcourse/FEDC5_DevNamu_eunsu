interface Props {
  comment: string;
}

const MyComment = ({ comment }: Props) => {
  return (
    <div>
      <div className="mb-2 text-lg font-normal">{comment}</div>
    </div>
  );
};

export default MyComment;
