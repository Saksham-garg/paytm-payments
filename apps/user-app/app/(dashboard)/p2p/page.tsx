"use client"
import React from 'react'
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { Input } from "@repo/ui/components/input.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select.tsx'
import { Label } from "@repo/ui/components/label.tsx";
import { useForm } from "@tanstack/react-form";
import { authSchema, authTypeSchema } from "@repo/common/schema"
import { zodValidator } from "@tanstack/zod-form-adapter";

const page = () => {
    const form = useForm({
        defaultValues: {
          number: '',
          amount: ''
        },
        onSubmit: async ({ value }) => {
          console.log(value)
          console.log(form)
          //  signIn("credentials", formData)
        },
        validatorAdapter: zodValidator(),
        validators: {
          onSubmit: authSchema,
          onChange: authSchema,
          onChangeAsyncDebounceMs: 100,
        },
      })
  return (
    <div className='w-full h-full flex items-center justify-center'>
           <div className="h-min flex flex-col rounded-lg bg-white p-4 border min-w-96">
            <p className='border-b pb-3'>Send</p>
            <form
                noValidate
                className=" py-3"
                onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
                }}
            >
                <div className="flex flex-col gap-6 w-full ">
                <form.Field
                    name="number"
                    children={(field) => (
                    <>
                        <Label htmlFor={field.name}>Number</Label>
                        <Input
                        type="string"
                        placeholder="Number..."
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
                    name="amount"
                    children={(field) => (
                    <>
                        <Label htmlFor={field.name}>Amount</Label>
                        <Input
                        type="string"
                        placeholder="Amount..."
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
                    <Button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} >
                        Send
                    </Button>
                    )}
                />
                </div>
            </form>
            </div>
        </div>
  )
}

export default page