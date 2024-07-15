import express from 'express'
import db from '@repo/db'

const app = express()
app.post('/hdfcWebhook', async(req,res) => {
    const paymentInformation = {
        userId: req.body.user_identifier,
        token: req.body.token,
        amount: req.body.amount
    }

        try {
            await db.$transaction([
                 db.balance.update({
                    where:{
                        userId: paymentInformation.userId
                    },
                    data:{
                        amount:{
                            increment: paymentInformation.amount
                            }
                        }
                }),
                 db.onRampTransaction.update({
                    where:{
                        token:paymentInformation.token
                    },
                    data:{
                        status:"Success"
                    }
                })
            ])
                res.status(200).json({
                    message:'captured'
                })
        } catch (error) {
            console.log(error)
            return res.status(411).json({
                message:"Error while processing webhook"
            })
        }
})
export const hdfcWebhook = async() => {
   
}