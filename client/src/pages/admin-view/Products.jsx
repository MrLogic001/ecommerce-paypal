import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/Form";
import { addProductFormElements } from "@/components/config";
import ProductsImageUpload from "@/components/admin-view/ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  editProduct,
  getAllProducts,
  deleteProduct,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/ProductTile";

const AdminProducts = () => {
  const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [openCreateProductsDialogue, setOpenCreateProductsDialogue] =
    useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { productsList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    currentEditedId !== null
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data, "Edit product");

            if (data?.payload?.success) {
              dispatch(getAllProducts());
              setFormData(initialFormData);
              setCurrentEditedId(null);
              setOpenCreateProductsDialogue(false);
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data, "product data");

          if (data?.payload?.success) dispatch(getAllProducts());
          setOpenCreateProductsDialogue(false);
          setImageFile(null);
          setFormData(initialFormData);

          toast({
            title: "Product added successfully",
          });
        });
  };

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId, "getCurrentProductId");

    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getAllProducts());
      }
    });
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log(formData, "formData");

  return (
    <Fragment>
      <div className="flex w-full justify-end mb-5">
        <Button onClick={() => setOpenCreateProductsDialogue(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productsList && productsList.length > 0
          ? productsList.map((productItem, index) => (
              <AdminProductTile
                setFormData={setFormData}
                currentEditedId={currentEditedId}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialogue={setOpenCreateProductsDialogue}
                key={index}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialogue}
        onOpenChange={() => {
          setOpenCreateProductsDialogue(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
            <ProductsImageUpload
              image={imageFile}
              setImage={setImageFile}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              imageLoadingState={imageLoadingState}
              setImageLoadingState={setImageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <div className="py-6">
              <CommonForm
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? "Edit" : "Add"}
                formControls={addProductFormElements}
                isBtnDisabled={!isFormValid()}
              />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
