import { Image, ImageOff } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

const ImageUploadForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col items-center">
      <input ref={inputRef} type="image" className="hidden" />
      <img className="h-40 w-40 rounded-sm bg-gray-200" />
      <Button className="my-2">
        <Image className="mr-2" />
        사진 업로드
      </Button>
      <Button variant="outline">
        <ImageOff className="mr-2" />
        사진 제거
      </Button>
    </div>
  );
};

export default ImageUploadForm;
