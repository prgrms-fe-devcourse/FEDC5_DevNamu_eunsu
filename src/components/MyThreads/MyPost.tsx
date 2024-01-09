interface Props {
  title: string;
}

const MyPost = ({ title }: Props) => {
  return (
    <li className="max-w-xl">
      <div className="mb-2 overflow-hidden truncate text-lg font-normal">
        {title ? title : "잘못된 글 데이터입니다."}
      </div>
    </li>
  );
};

export default MyPost;
