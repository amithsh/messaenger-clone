"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import React, { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";

import { FieldValues, useForm, SubmitHandler, Form } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast/headless";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
 

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setvariant] = useState<Variant>("LOGIN");
  const [loading, setloading] = useState(false);


  useEffect(()=>{
    if(session?.status=='authenticated'){
      router.push('/users')
      console.log("authenticated")
    }
  })

  const togglevariant = useCallback(() => {
    if (variant == "REGISTER") {
      setvariant("LOGIN");
      console.log("toggled");
    } else {
      setvariant("REGISTER");
      console.log("toggled");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setloading(true);

    if (variant == "LOGIN") {
      signIn('credentials',{
        ...data,
        redirect: false
      })
      .then((callback)=>{
        if(callback?.error){
          toast.error(callback.error)
        }
        if(callback?.ok){
          toast.success('logged in')
          console.log('logged in')
          router.push('/users')
        }
      })
      .finally(()=>{setloading(false)})
    }
    if (variant == "REGISTER") {
      axios.post("/api/register", data)
      .then(()=>{signIn('credentials',data)})
      .catch(()=>toast.error('something went wrong'))
      .finally(()=> setloading(false))
      
    }
  };


  const socialAction =(action:string) =>{
      setloading(true)

      signIn(action,{redirect:false})
      .then((callback)=>{

        if(callback?.error){
          toast.error(callback.error)
        }
       

      })
      .finally(()=>{setloading(false)})
      console.log("logged in through github")
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-full ">
      <AuthSocialButton onclick={()=>{socialAction}} icon={BsGithub} disabled={loading} />
      <AuthSocialButton onclick={()=>{socialAction}} icon={BsGoogle} disabled={loading} />
      <div
        className="
        bg-white
        px-4
        py-8
        shadow
        sm:rounded-lg
        sm:px-10
        "
      >
        <form className="space-y-6" onSubmit={handleSubmit(onsubmit)}>
          {variant == "REGISTER" && (
            <Input
              id="name"
              errors={errors}
              register={register}
              label="Name"
              disabled={loading}
            />
          )}
          <Input
            id="email"
            type="email"
            errors={errors}
            register={register}
            label="email"
            disabled={loading}
          />
          <Input
            id="password"
            type="password"
            errors={errors}
            register={register}
            label="password"
            disabled={loading}
          />
          <div>
            <Button type="submit" disabled={loading} fullwidth>
              {variant == "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className="mt-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
            <div className="mt-6 flex gap-3 cursor-pointer">
              <AuthSocialButton
                icon={BsGithub}
                onclick={() => socialAction("github")}
                disabled={loading}
              />
              <AuthSocialButton
                
                icon={BsGoogle}
                onclick={() => socialAction("google")}
                disabled={loading}
              />
            </div>

            <div className="flex gap-2 mt-6 justify-center text-sm px-2 text-gray-500">
              <div>
                {variant == "LOGIN"
                  ? "New to messenger?"
                  : "Already have an account?"}
              </div>
            </div>
          </div>
          <div onClick={togglevariant} className="flex items-center justify-center cursor-pointer underline">
            {variant == "LOGIN" ? "create an account" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
