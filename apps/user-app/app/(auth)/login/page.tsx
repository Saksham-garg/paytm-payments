"use client"

import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { Input } from "@repo/ui/components/input.tsx";
import { Label } from "@repo/ui/components/label.tsx";
import { ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "@tanstack/react-form";
import { authLoginSchema } from "@repo/common/schema"
import { zodValidator } from "@tanstack/zod-form-adapter";
import type { SignInResponse } from 'next-auth/react';
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()
  const user = useSession()
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ value }) => {
      console.log(process.env.NEXT_PUBLIC_NEXT_AUTH_REDIRECT_URL)
      const { error, ok, url } = await signIn("credentials", { ...value, callbackUrl: process.env.NEXT_PUBLIC_NEXT_AUTH_REDIRECT_URL, redirect: false }) as unknown as SignInResponse;
      if (error) {
        toast.error("Invalid Email or password.")
        return
      }
      if (ok) {
        toast.success("Login successfull", { duration: 4000 })
      }
      if (url) {
        return router.push(process.env.NEXT_PUBLIC_NEXT_AUTH_REDIRECT_URL!)
      }

    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: authLoginSchema,
      onChange: authLoginSchema,
      onChangeAsyncDebounceMs: 100,
    },
  })
  return <div className="flex items-center justify-center min-h-screen w-full p-4">
    <div className="flex flex-col items-center justify-center max-w-[28rem]">
      <p className="font-sans text-3xl text-center">Join & Connect the Fastest Growing Online Community</p>
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
                  type="email"
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
              <Button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} disabled={!canSubmit} >
                Login  {isSubmitting ? <Loader /> : <ArrowRight className="w-4 h-4 ml-4" />}
              </Button>
            )}
          />
        </div>
      </motion.form>
      <p className='text-xs mt-12'>No Account yet? <Link href="/signup" className='text-sm font-bold'>
        SIGN UP</Link></p>
    </div>
  </div>
}

export default Login