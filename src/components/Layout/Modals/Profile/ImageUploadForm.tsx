import { Image } from "lucide-react";
import { useRef, useState } from "react";
import { AxiosError } from "axios";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import usePutProfile from "@/apis/auth/usePutProfile";
import useToast from "@/hooks/common/useToast";
import {
  AUTH_ERROR_MESSAGE,
  AUTH_ERROR_RESPONSE,
  AUTH_SUCCESS_MESSAGE,
} from "@/constants/toastMessage";
import { DEFAULT_PROFILE } from "@/constants/commonConstants";

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
        success: ({ image }) => {
          setPreviewImage(image);
          gtag("event", "ui사용_사용자_프로필_이미지_변경");
          return AUTH_SUCCESS_MESSAGE.PROFILE_IMAGE_UPLOAD;
        },
        error: (error: AxiosError) => {
          if (error?.response?.data === AUTH_ERROR_RESPONSE.IMAGE_UNMATCHED) {
            return AUTH_ERROR_MESSAGE.IMAGE_UNMATCHED;
          }
          return AUTH_ERROR_MESSAGE.PROFILE_IMAGE_UPLOAD;
        },
      },
    });
  };

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
          src={previewImage || DEFAULT_PROFILE}
          className={cn(
            "h-40 w-40 rounded-full border-2 border-solid border-white bg-gray-200 object-cover",
            !previewImage ? "bg-white" : "",
            isDragActive ? "border-2 border-dashed border-blue-500" : "",
          )}
        />
      </div>
      <span className="mb-1 mt-2 text-xs text-gray-400">드래그하여 사진을 첨부해보세요!</span>
      <Button className="mt-2" onClick={handleClickUpload}>
        <Image className="mr-2" />
        사진 업로드
      </Button>
    </div>
  );
};

export default ImageUploadForm;
