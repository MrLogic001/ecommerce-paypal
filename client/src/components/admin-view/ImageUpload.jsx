import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../../store/auth-slice";
import { Skeleton } from "../ui/skeleton";

const ProductsImageUpload = ({
  image,
  setImage,
  uploadedImageUrl,
  setUploadedImageUrl,
  imageLoadingState,
  setImageLoadingState, isEditMode, isCustomStyling=false
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    // console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImage(selectedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) setImage(droppedFile);
  };

  function handleRemoveImage() {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append("my_file", image);

    setImageLoadingState(true);

    const response = await axios.post(
      `${backendUrl}/api/admin/products/upload-image`,
      data
    );

    setUploadedImageUrl(response?.data.result.url); 

    if (response.success) {
      
      //setUploadedImageUrl(response.data?.result.url);
      
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (image !== null) uploadImageToCloudinary();
  }, [image]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : " max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${isEditMode ? "opacity-80": ""}"border-2 border-dashed p-4 rounded-lg"}`}
      >
        <input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />
        {!image ? (
          <Label
            className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
            htmlFor="image-upload"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : (
          //imageLoadingState ? <Skeleton className="h-10 bg-gray-100"/> :
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="mr-2 w-8 h-8" />
              <p className="text-sm font-medium">{image.name}</p>
              <Button
                onClick={handleRemoveImage}
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground"
              >
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove File</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsImageUpload;
