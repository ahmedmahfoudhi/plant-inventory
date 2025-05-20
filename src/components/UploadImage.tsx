"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { getUTImageUrl } from "@/lib/utils";

export interface UploadImageProps {
  onChange: (url: string) => void;
  image?: string;
  endpoint: "imageUploader";
}

function UploadImage({ onChange, image, endpoint }: UploadImageProps) {
  const [currentImageKey, setCurrentImageKey] = useState<string>(image || "");
  const imageUrl = getUTImageUrl(currentImageKey);
  const updateImageUrl = (key: string) => {
    onChange(key);
    setCurrentImageKey(key);
  };

  const handleDeleteImage = () => {
    updateImageUrl("");
  };

  if (currentImageKey) {
    return (
      <div className="flex flex-col items-center p-2 max-h-[300px]">
        <Image
          src={imageUrl}
          alt="plant image"
          height={200}
          width={250}
          className="object-contain overflow-hidden"
        />
        <Button
          variant="destructive"
          onClick={handleDeleteImage}
          className="mt-2"
        >
          <Trash2 className="w-12 h-12" />
        </Button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          toast.success("Filed uploaded successfully");
          updateImageUrl(res[0].key);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
          toast.error("Failed to upload file");
        }}
      />
    </div>
  );
}

export default UploadImage;
