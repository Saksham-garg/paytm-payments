import express from 'express'
import cors from "cors"
import db from '@repo/db/client'
import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.post('/hdfcWebhook', async(req,res) => {
    console.log(req.body)
    const paymentInformation = {
        userId: req.body.userId,
        token: req.body.token,
        amount: req.body.amount,
        status: req.body.status
    }

    try {
        await db.$transaction([
                db.balance.update({
                where:{
                    userId: paymentInformation.userId
                },
                data:{
                    amount:{
                        increment: paymentInformation.status == 'Success' ?  paymentInformation.amount:0
                        }
                    }
            }),
                db.onRampTransaction.update({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status: paymentInformation.status
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

app.listen(3003);