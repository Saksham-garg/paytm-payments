"use client";

import TextField from "@repo/ui/TextField";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { ArrowRight } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex flex-col items-center justify-center max-w-[28rem]">
        <p className="font-sans text-3xl text-center">
          Join & Connect the Fastest Growing Online Community
        </p>
        <div className="flex flex-col gap-6 w-full mt-12">
          <TextField
            type="string"
            placeholder="Email"
            onChange={(data) =>
              setFormData({
                ...formData,
                phone: data,
              })
            }
          />
          <TextField
            type="password"
            placeholder="Password"
            onChange={(data) =>
              setFormData({
                ...formData,
                password: data,
              })
            }
            isPasswordVisible={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
          />
          <Button className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Sign In <ArrowRight className="w-4 h-4 ml-4" />
          </Button>
        </div>
        <p className="text-xs mt-12">
          Own an Account?
          <Link href="/login" className="text-sm font-bold">
            JUMP RIGHT IN
          </Link>
        </p>
        <button onClick={() => signIn("credentials", formData)}>Sign in</button>
      </div>
    </div>
  );
};

export default SignIn;
