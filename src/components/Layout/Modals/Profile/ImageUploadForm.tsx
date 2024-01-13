import { Image, ImageOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as Sentry from "@sentry/react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import usePutProfile from "@/apis/auth/usePutProfile";
import useToast from "@/hooks/common/useToast";
import { AUTH_ERROR_MESSAGE, AUTH_SUCCESS_MESSAGE } from "@/constants/toastMessage";

interface Props {
  profileImage: string | undefined;
  setIsClicked: (isClicked: boolean) => void;
}

const ImageUploadForm = ({ profileImage, setIsClicked }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState(profileImage);
  const [isDragActive, setIsDragActive] = useState(false);
  const { uploadProfileImage } = usePutProfile();
  const { showPromiseToast } = useToast();

  const handleClickUpload = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
    setIsClicked(true);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (image) uploadImage(image);
  };

  const handleRemoveImage = () => {
    setPreviewImage("");
    setIsClicked(true);
  };

  const handleDragEnter = () => {
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    const image = event.dataTransfer.files?.[0];
    if (image) uploadImage(image);
  };

  const uploadImage = (image: File) => {
    showPromiseToast({
      promise: uploadProfileImage(image),
      messages: {
        success: () => {
          const imagePreviewUrl = URL.createObjectURL(image);
          setPreviewImage(imagePreviewUrl);
          Sentry.captureMessage("ui 사용 - 사용자 프로필 이미지 변경", "info");
          return AUTH_SUCCESS_MESSAGE.PROFILE_IMAGE_UPLOAD;
        },
        error: AUTH_ERROR_MESSAGE.PROFILE_IMAGE_UPLOAD,
      },
    });
  };

  useEffect(() => {
    return () => {
      if (previewImage) URL.revokeObjectURL(previewImage);
    };
  }, [previewImage]);

  return (
    <div className="flex flex-col items-center">
      <input
        onChange={handleChangeImage}
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
      />
      <div
        className="flex h-40 w-full justify-center"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <img
          src={previewImage || "/svg/userProfile.svg"}
          className={cn(
            "h-40 w-40 rounded-full border-2 border-solid border-white bg-gray-200 object-cover",
            !previewImage ? "bg-white" : "",
            isDragActive ? "border-2 border-dashed border-blue-500" : "",
          )}
        />
      </div>
      <span className="mb-1 mt-2 text-xs text-gray-400">드래그하여 사진을 첨부해보세요!</span>
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
