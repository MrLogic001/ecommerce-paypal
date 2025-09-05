import CommonForm from "@/components/common/Form";
import { registerFormControls } from "@/components/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (e) => {
    e.preventDefault();
    
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        navigate("/auth/login");
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  };
  const [formData, setFormData] = useState(initialState);

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight font-bold text-foreground">
          Create an Account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            to={"/auth/login"}
            className="
        font-medium text-primary hover:underline ml-2
        "
          >
            <span>Login here...</span>
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
