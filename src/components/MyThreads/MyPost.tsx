interface Props {
  title: string;
}

const MyPost = ({ title }: Props) => {
  return (
    <li className="max-w-xl">
      <div className="mb-2 overflow-hidden truncate text-lg font-normal">{title}</div>
    </li>
  );
};

export default MyPost;
