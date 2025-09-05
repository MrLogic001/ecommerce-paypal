import React, {useState } from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";

const initialFormData = {
  status: "",
};

const AdminOrdersDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData)

    function handleUpdateStatus (event) {
        event.preventDefault()
    }

  return (
    <DialogContent className="sm:max-w-[600px]">
      <div className="grid gap-6">
        <div className="grid gap-2">
          <div className="flex items-center justify-between mt-6">
            <p className="font-medium">Order ID</p>
            <Label>123456</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Date</p>
            <Label>01/09/2025</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Status</p>
            <Label>In process</Label>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="font-medium">Order Price</p>
            <Label>$1500</Label>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium">Order Details</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span>Product Price</span>
                <span>$100</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid gap-4"></div>
        <div className="grid gap-2"></div>
        <div className="font-medium">Shipping Info</div>
        <div className="grid gap-0.5 text-muted-foreground">
          <span>John Smith</span>
          <span>Address</span>
          <span>City</span>
          <span>Pincode</span>
          <span>Phone</span>
          <span>Notes</span>
        </div>
        <div>
             <CommonForm
            formControls={[
              {
                label: "Order Status",
                name: "status",
                componentType: "select",
                options: [
                  { id: "pending", label: "Pending" },
                  { id: "inProcess", label: "In Process" },
                  { id: "inShipping", label: "In Shipping" },
                  { id: "delivered", label: "Delivered" },
                  { id: "rejected", label: "Rejected" },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Update Order Status"}
            onSubmit={handleUpdateStatus} 
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrdersDetailsView;
