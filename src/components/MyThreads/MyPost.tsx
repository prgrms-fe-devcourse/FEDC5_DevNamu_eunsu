interface Props {
  title: string;
}

const MyPost = ({ title }: Props) => {
  return (
    <li className="max-w-xl pb-3">
      <div className="mb-2 overflow-hidden truncate text-lg font-normal text-content-5">
        {title}
      </div>
    </li>
  );
};

export default MyPost;
