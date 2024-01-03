import { MessageSquareText, PencilLine, Siren, ThumbsUp, Trash2 } from "lucide-react";

interface Props {
  className?: string;
}

const ThreadToolbar = ({ className }: Props) => {
  return (
    <section
      className={`flex items-center justify-between space-x-5pxr rounded-md bg-gray-400 p-2 text-white ${className}`}
    >
      <button>
        <ThumbsUp />
      </button>
      <button>
        <MessageSquareText />
      </button>
      <button>
        <PencilLine />
      </button>
      <button>
        <Trash2 />
      </button>
      <button className="text-red-500">
        <Siren />
      </button>
    </section>
  );
};

export default ThreadToolbar;
