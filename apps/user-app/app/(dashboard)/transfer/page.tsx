"use client"
import React, { useEffect, useState } from 'react'
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
import z,{ authSchema, authTypeSchema } from "@repo/common/schema"
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Loader2 } from 'lucide-react';
import { createOnRampTransaction } from '../../lib/actions/createOnRampTxn';
import toast from 'react-hot-toast';
import { getOnRampTransactions } from '../../lib/actions/getOnRampTxn';
import { getUserBalance } from '../../lib/actions/getUserBalance';
const page = async() => {
  
  const [ transactions, setTransactions ] = useState([])
  const [ balance,setBalance ] = useState(null)
  const form = useForm({
    defaultValues: {
      amount: null,
      bank: 'HDFC Bank'
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await createOnRampTransaction(value.amount,value.bank)
        if(response){
          console.log(response)
          toast.success(JSON.parse(JSON.stringify(response.message)),{duration:4000})
        }
        fetchData()
      } catch (error:any) {
        toast.error(JSON.parse(JSON.stringify(error.message)))
      }
    }
  })
  const fetchData = async () => {
    try {
      const response = await getOnRampTransactions()
      setTransactions(response)
    } catch (error) {
      setTransactions([])
    }
  }

  const getBalance = async() => {
    try {
      const response = await getUserBalance()
      setBalance(response)
    } catch (error) {
      setBalance(null)
    }
  }
  const getColor = (status:string) => {
    switch(status){
      case 'Failure':
          return 'red'
      case 'Processing':
          return '#CEC103'
      case 'Success':
          return 'green'
    }
  }
  useEffect(() => {
    fetchData()
    getBalance()
  }, [])

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
                validatorAdapter={zodValidator()}
                validators={{
                  onChange:z.number().gt(0,"Amount must be greater than 0")
                }}
                children={(field) => (
                  <>
                    <Label htmlFor={field.name}>Amount</Label>
                    <Input
                      type="number"
                      placeholder="Amount..."
                      value={parseInt(field.state.value)}
                      name={field.name}
                      error={field.state.meta.errors.join(',')}
                      onChange={(e) =>  field.handleChange(parseInt(e.target.value))}
                    />
                  </>
                )}
              >
              </form.Field>
              <form.Field
                name="bank"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange:z.string()
                }}
                children={(field) => (
                  <>
                    <div className="relative flex flex-col gap-5">
                      <Label htmlFor={field.name}>Password</Label>
                      <Select
                       onValueChange={(value) => field.handleChange(value)}
                       defaultValue={field.state.value}
                      >
                        <SelectTrigger className="">
                          <SelectValue placeholder="Bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HDFC Bank">HDFC Bank</SelectItem>
                          <SelectItem value="AXIS Bank">AXIS Bank</SelectItem>
                          <SelectItem value="ICICI Bank">ICICI Bank</SelectItem>
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
                  <Button type="submit" disabled={!canSubmit} className={buttonVariants({ variant: "ghost", size: "sm" })} >
                    Add Money { isSubmitting ? <Loader2 /> : '' }
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
                    <p>{balance?.amount || 0}</p>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <p>Total Locked balance</p>
                    <p>{balance?.locked || 0} INR</p>
                  </div>
                  <div className="flex justify-between text-sm py-2 border-b ">
                    <p>Total balance</p>
                    <p>{ (balance?.locked + balance?.amount ) || 0}  INR</p>
                  </div>
              </div>
            <div className="flex flex-col rounded-lg bg-white p-4 border flex-1">
              <p className='border-b pb-3'>Recent Transactions</p>
              {
                transactions && 
                transactions.map((txn) => {
                  return  <div className="flex justify-between text-sm py-2 border-b" key={txn?.time}>
                    <div className="flex flex-col">
                      <p>Received INR</p> 
                      <p className='text-xs text-gray-400'>{txn?.time.toDateString()}, {txn?.time.toLocaleTimeString()}</p>
                    </div>
                    <div className="flex flex-col items-end flex-1">
                    <p>+ Rs {txn?.amount}</p>
                    <p className='rounded p-1' style={{color:getColor(txn?.status)}}>{ txn?.status}</p>
                    </div>
                </div>
                })
              }
              {
                !transactions.length && <p className='text-base font-medium p-6 flex items-center justify-center'>No Transactions yet</p>
              }
            </div>
        </div>
      </div>
    </div>
  )
}

export default page