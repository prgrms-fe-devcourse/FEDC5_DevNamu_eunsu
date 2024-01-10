import thumbsUpIcon from "/thumbs-up.png";

import { Button } from "../ui/button";

import { cn } from "@/lib/utils";

import { MouseEvent } from "react";

interface LikeToggleButtonProps {
  clicked: boolean;
  onClick: (event: MouseEvent) => void;
  numberOfLikes: number;
}

const LikeToggleButton = ({ clicked, onClick, numberOfLikes }: LikeToggleButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "h-7 select-none gap-1 rounded-2xl border-2 border-gray-100 bg-gray-100 px-2 text-xs text-gray-600",
        clicked
          ? "border-sky-500 bg-blue-100 font-bold text-sky-700 hover:bg-blue-200"
          : "hover:border-gray-600 hover:bg-white",
      )}
    >
      <img src={thumbsUpIcon} className="h-4 w-4" />
      <span>{numberOfLikes}</span>
    </Button>
  );
};

export default LikeToggleButton;
