interface Props {
  title: string;
}

const MyPost = ({ title }: Props) => {
  return (
    <div className="max-w-xl">
      <div className="mb-2 overflow-hidden truncate text-lg font-normal">
        {title ? title : "글 내용이 존재하지 않음."}
      </div>
    </div>
  );
};

export default MyPost;
