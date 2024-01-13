import { Image, ImageOff } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

const ImageUploadForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClickUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };


  return (
    <div className="flex flex-col items-center">
      <img className="h-40 w-40 rounded-sm bg-gray-200" />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <Button className="my-2" onClick={handleClickUpload}>
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
