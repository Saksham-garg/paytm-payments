"use client"
import React,{useState,useEffect} from 'react'
import { Button, buttonVariants } from "@repo/ui/components/button.tsx";
import { Input } from "@repo/ui/components/input.tsx";
import { Label } from "@repo/ui/components/label.tsx";
import { useForm } from "@tanstack/react-form";
import { transferP2P } from '@repo/common/transfer'
import { zodValidator } from "@tanstack/zod-form-adapter";
import { P2PTransfer } from '../../lib/actions/p2pTransfer';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import { P2PTransactions } from '../../lib/actions/getP2PTransactions';

const page = () => {
  const [ transactions, setTransactions ] = useState([])
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

      const fetchP2PTransactions = async() => {
        try {
          const response = await P2PTransactions()
          console.log(response)
          setTransactions(response)
        } catch (error) {
          setTransactions([])
        }
      }
      useEffect(() => {
        fetchP2PTransactions()
      },[])
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-8'>

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

        <div className="flex flex-col rounded-lg bg-white p-4 border flex-1 w-full overflow-scroll">
            <p className='border-b pb-3'>Recent Transactions</p>
            <p className='border-b pb-3'>Recieved Transactions</p>
            
            {
              transactions?.receivedTransfers?.length > 0 ? 
              transactions.receivedTransfers.map((txn) => {
                return  <div className="flex justify-between text-sm py-2 border-b" key={txn?.timestamp}>
                  <div className="flex flex-col flex-1">
                    <p>Received INR</p> 
                    <p className='text-xs text-gray-400'>{txn?.timestamp.toDateString()}, {txn?.timestamp.toLocaleTimeString()}</p>
                  </div>
     
                  <div className="flex flex-col items-end flex-1">
                      <p>+ Rs {txn?.amount}</p>
                      {/* <p className='rounded p-1' style={{color:getColor(txn?.status)}}>{ txn?.status}</p> */}
                  </div>
              </div>
              }):"No received Transactions"
            }
            <p className='border-b pb-3'>Send Transactions</p>
            
            {
              transactions?.sendTransfers?.length > 0 ? 
              transactions.sendTransfers.map((txn) => {
                return  <div className="flex justify-between text-sm py-2 border-b" key={txn?.timestamp}>
                  <div className="flex flex-col flex-1">
                    <p>Send INR</p> 
                    <p className='text-xs text-gray-400'>{txn?.timestamp.toDateString()}, {txn?.timestamp.toLocaleTimeString()}</p>
                  </div>
     
                  <div className="flex flex-col items-end flex-1">
                      <p> Rs {txn?.amount}</p>
                      {/* <p className='rounded p-1'>{ txn?.number}</p> */}
                  </div>
              </div>
              }):"No received Transactions"
            }
          </div>
        </div>
  )
}

export default page