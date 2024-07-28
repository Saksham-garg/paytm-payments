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
import axios from 'axios';
const page = () => {
  const [ transactions, setTransactions ] = useState([])
  const [ balance,setBalance ] = useState(null)

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
  
  interface paymentInfoInterface {
    userId: string,
    token: string,
    amount: Number,
    status:string
  }

  const updatePaymentStatus = async(paymentInfo : paymentInfoInterface) => {
      try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BANK_WEBHOOK_URL + 'hdfcWebhook',paymentInfo)
        if(response){
          toast.success(response.data.message,{duration:4000})
        }
        fetchData()
      } catch (error:any) {
        console.log(error)
        toast.error(error.response.message)
      }
  }
  
  useEffect(() => {
    fetchData()
    getBalance()
  }, [])

  return (
    <div className='flex flex-col w-full'>
    <h1 className='text-3xl font-bold w-full'>Transactions</h1>
    <div className="grid grid-cols-1 gap-8 w-full mt-8">
      <div className="col-item flex flex-col gap-4">
          <div className="flex flex-col rounded-lg bg-white p-4 border flex-1">
            <p className='border-b pb-3'>Balance</p>
                <div className="flex justify-between text-sm py-2 border-b ">
                  <p>Unlocked balance</p>
                  <p>{balance?.amount}</p>
                </div>
                <div className="flex justify-between text-sm py-2 border-b ">
                  <p>Total Locked balance</p>
                  <p>{balance?.locked} INR</p>
                </div>
                <div className="flex justify-between text-sm py-2 border-b ">
                  <p>Total balance</p>
                  <p>{ balance?.locked + balance?.amount } INR</p>
                </div>
            </div>
          <div className="flex flex-col rounded-lg bg-white p-4 border flex-1">
            <p className='border-b pb-3'>Recent Transactions</p>
            {
              transactions && 
              transactions.map((txn) => {
                return  <div className="flex justify-between text-sm py-2 border-b" key={txn?.time}>
                  <div className="flex flex-col flex-1">
                    <p>Received INR</p> 
                    <p className='text-xs text-gray-400'>{txn?.time.toDateString()}, {txn?.time.toLocaleTimeString()}</p>
                  </div>
                  <div className="flex gap-3 flex-1 justify-center">
                    <Button className='bg-green-600' disabled={txn?.status !== 'Processing'} onClick={() => updatePaymentStatus({
                      userId:txn?.userId,
                      amount:txn.amount,
                      token:txn?.token,
                      status:'Success'
                    })}>
                        Success
                    </Button>
                    <Button className='bg-red-600' disabled={txn?.status !== 'Processing'} onClick={() => updatePaymentStatus({
                      userId:txn?.userId,
                      amount:txn.amount,
                      token:txn?.token,
                      status:'Failure'
                    })}>
                        Failed
                    </Button>
                  </div>
                  <div className="flex flex-col items-end flex-1">
                      <p>+ Rs {txn?.amount}</p>
                      <p className='rounded p-1' style={{color:getColor(txn?.status)}}>{ txn?.status}</p>
                  </div>
              </div>
              })
            }
          </div>
      </div>
    </div>
  </div>
  )
}

export default page