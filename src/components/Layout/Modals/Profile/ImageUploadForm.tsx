import { Image, ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import usePutProfile from "@/apis/auth/usePutProfile";
import useToast from "@/hooks/common/useToast";
import { AUTH_ERROR_MESSAGE, AUTH_SUCCESS_MESSAGE } from "@/constants/toastMessage";

interface Props {
  profileImage: string | undefined;
}

const ImageUploadForm = ({ profileImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(profileImage);
  const { uploadProfileImage } = usePutProfile();
  const { showPromiseToast } = useToast();

  const handleClickUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) {
      const formData = new FormData();
      formData.append("isCover", JSON.stringify(false));
      formData.append("profileImage", image);
      showPromiseToast({
        promise: uploadProfileImage(formData),
        messages: {
          success: () => {
            const imagePreviewUrl = URL.createObjectURL(image);
            setPreviewImage(imagePreviewUrl);
            return AUTH_SUCCESS_MESSAGE.PROFILE_IMAGE_UPLOAD;
          },
          error: AUTH_ERROR_MESSAGE.PROFILE_IMAGE_UPLOAD,
        },
      });
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
      <span className="my-1 text-xs text-gray-400">드래그하여 사진을 첨부해보세요!</span>
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
