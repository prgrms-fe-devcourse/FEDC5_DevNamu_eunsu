interface Props {
  title: string;
}

const MyPost = ({ title }: Props) => {
  return (
    <li className="max-w-xl">
      <div className="mb-2 overflow-hidden truncate text-lg font-normal">
        {title ? title : "글 내용이 존재하지 않음."}
      </div>
    </li>
  );
};

export default MyPost;
