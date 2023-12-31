import { Thread } from "@/types/thread";

interface Props {
  threads: Thread[];
}

const ThreadList = ({ threads }: Props) => {
  return (
    <ul>
      {threads.map((thread) => (
        <li key={thread._id}>
          <span>{thread.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default ThreadList;
