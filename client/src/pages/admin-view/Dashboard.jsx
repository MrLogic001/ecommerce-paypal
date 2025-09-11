import { useEffect, useState } from "react";
import ProductsImageUpload from "@/components/admin-view/ImageUpload";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImage, getFeatureImages } from "@/store/commonSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const { featureImageList } = useSelector((state) => state.commonFeature)

  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages())
        setImageFile(nul)
        setUploadedImageUrl('')
      }
    })   
  }

  useEffect(() => {
    dispatch(getFeatureImages())
  }, [dispatch])

  console.log(featureImageList, 'featureImageList');
  
  return (
    <div>
      <ProductsImageUpload
        image={imageFile}
        setImage={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}
        isCustomStyling={true}
        //isEditMode={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
