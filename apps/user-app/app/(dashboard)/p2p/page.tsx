"use client"
import React from 'react'
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { Input } from "@repo/ui/components/input.tsx";
import { Label } from "@repo/ui/components/label.tsx";
import { useForm } from "@tanstack/react-form";
import { authSchema, authTypeSchema } from "@repo/common/schema"
import { transferP2P } from '@repo/common/transfer'
import { zodValidator } from "@tanstack/zod-form-adapter";
import { P2PTransfer } from '../../lib/actions/p2pTransfer';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';

const page = () => {
    const form = useForm({
        defaultValues: {
          number: '',
          amount: null
        },
        onSubmit: async ({ value }) => {
            try {
              const response = await P2PTransfer(value.number,Number(value.amount))
              if(response){
                toast.success(response.message,{ duration:4000 })
              }
            } catch (error:any) {
              toast.error(error.message,{ duration:4000 })
            }
        },
        validatorAdapter: zodValidator(),
        validators: {
          onSubmit: transferP2P,
          onChange: transferP2P,
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
                        type="number"
                        placeholder="Amount..."
                        value={Number(field.state.value)}
                        name={field.name}
                        error={field.state.meta.errors.join(',')}
                        onChange={(e) => field.handleChange(Number(e.target.value))}
                        />
                    </>
                    )}
                >

                </form.Field>
                <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                    <Button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} 
                    disabled={!canSubmit}
                    >
                        Send { isSubmitting ? <Loader className='ml-2'/> :''}
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