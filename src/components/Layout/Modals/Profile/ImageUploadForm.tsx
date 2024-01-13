import { Image, ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

const ImageUploadForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClickUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const imagePreviewUrl = URL.createObjectURL(image);
      setPreviewImage(imagePreviewUrl);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <div className="flex flex-col items-center">
      <input
        onChange={handleUploadImage}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <img
        src={previewImage || "/svg/userProfile.svg"}
        className={cn(
          "h-40 w-40 rounded-full bg-gray-200 object-cover",
          !previewImage ? "bg-white" : "",
        )}
      />
      <Button className="my-2" onClick={handleClickUpload}>
        <Image className="mr-2" />
        사진 업로드
      </Button>
      <Button variant="outline" onClick={handleRemoveImage}>
        <ImageOff className="mr-2" />
        사진 제거
      </Button>
    </div>
  );
};

export default ImageUploadForm;
