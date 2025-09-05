import CommonForm from "@/components/common/Form";
import { loginFormControls } from "@/components/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {

  const dispatch = useDispatch()
  //const navigate = useNavigate()

  const { toast } = useToast()

  const onSubmit = (e) => {
    
    e.preventDefault()
    dispatch(loginUser(formData)).then((data)=> {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message
        })
      } else {
        toast({
          title: data?.payload?.message,
          variant: 'destructive'
        })
      }
    })
  
  }
  const [formData, setFormData] = useState(initialState);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl tracking-tight font-bold text-foreground">
          Log into your Account
        </h1>
        <p className="mt-2">
          Don't have an account?{" "}
          <Link
            to={"/auth/register"}
            className="
        font-medium text-primary hover:underline ml-2
        "
          >
            <span>Register here...</span>
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
