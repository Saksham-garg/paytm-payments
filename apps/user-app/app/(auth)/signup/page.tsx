"use client";

import Link from "next/link";
import { useState } from "react";
import axios from 'axios'
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { Input } from "@repo/ui/components/input.tsx";
import { Label } from "@repo/ui/components/label.tsx";
import { ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { authSchema } from "@repo/common/schema"
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SignIn = () => {
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      email: '',
      phone: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post('api/register',value)
        if(response?.data){
          router.push('/dashboard')
          toast.success("User created sucessfully.")
        }
      } catch (error:any) {
        toast.error(error?.response?.data, {
          duration: 4000
        })
      }
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: authSchema,
      onChange: authSchema,
      onChangeAsyncDebounceMs: 100,
    },
  })

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen w-full p-4">
      <div className="flex flex-col items-center justify-center max-w-[28rem]">
        <p className="font-sans text-3xl text-center">
          Join & Connect the Fastest Growing Online Community
        </p>
        <motion.form
          noValidate
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="flex flex-col gap-6 w-full mt-12">
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Email</Label>
                  <Input
                    type="string"
                    placeholder="Enter you email..."
                    value={field.state.value}
                    name={field.name}
                    error={field.state.meta.errors.join(',')}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            >
            </form.Field>
            <form.Field
              name="phone"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Phone</Label>
                  <Input
                    type="string"
                    placeholder="Enter you phone number..."
                    value={field.state.value}
                    name={field.name}
                    error={field.state.meta.errors.join(',')}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            >
            </form.Field>
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <Label htmlFor={field.name}>Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter you password..."
                    value={field.state.value}
                    name={field.name}
                    error={field.state.meta.errors.join(',')}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              )}
            >

            </form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} disabled={!canSubmit}>
                  Sign Up   {isSubmitting ? <Loader /> : <ArrowRight className="w-4 h-4 ml-4" />}
                </Button>
              )}
            />
          </div>
        </motion.form>
        <p className="text-xs mt-12">
          Own an Account?
          <Link href="/login" className="text-sm font-bold">
            JUMP RIGHT IN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
