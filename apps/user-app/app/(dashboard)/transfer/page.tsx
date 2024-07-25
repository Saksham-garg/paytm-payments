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
      amount: '',
      bank: ''
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
    <div className='flex flex-col w-full'>
      <h1 className='text-3xl font-bold w-full'>Transfer</h1>
      <div className="grid grid-cols-2 gap-8 w-full mt-8">
        <div className="col-item h-min flex flex-col rounded-lg bg-white p-4 border">
          <p className='border-b pb-3'>Add Money</p>
          <form
            noValidate
            className="w-full py-3"
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="flex flex-col gap-6 w-full ">
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
                    {form.validateField}
                  </>
                )}
              >
              </form.Field>
              <form.Field
                name="bank"
                children={(field) => (
                  <>
                    <div className="relative flex flex-col gap-5">
                      <Label htmlFor={field.name}>Password</Label>
                      <Select
                       onValueChange={(value) => field.handleChange(value)}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">HDFC Bank</SelectItem>
                          <SelectItem value="dark">AXIS Bank</SelectItem>
                          <SelectItem value="system">ICICI Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              >

              </form.Field>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} >
                    Add Money
                  </Button>
                )}
              />
            </div>
          </form>
        </div>
        <div className="col-item flex flex-col gap-4">
            <div className="flex flex-col rounded-lg bg-white p-4 border flex-1">
              <p className='border-b pb-3'>Balance</p>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <p>Unlocked balance</p>
                    <p>200INR</p>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <p>Total Locked balance</p>
                    <p>0INR</p>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <p>Total balance</p>
                    <p>200INR</p>
                  </div>
              </div>
            <div className="flex flex-col rounded-lg bg-white p-4 border flex-1">
              <p className='border-b pb-3'>Recent Transactions</p>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <div className="flex flex-col">
                      <p>Received INR</p>
                      <p className='text-xs text-gray-400'>Sat Mar 30 2024</p>
                    </div>
                    <p>+ Rs 200</p>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <div className="flex flex-col">
                      <p>Received INR</p>
                      <p className='text-xs text-gray-400'>Sat Mar 30 2024</p>
                    </div>
                    <p>+ Rs 200</p>
                  </div>
              </div>
        </div>
      </div>
    </div>
  )
}

export default page