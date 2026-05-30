import express from 'express'
import Redis from 'ioredis'


const app = express()
app.use(express.json())

const publisher = new Redis("redis://localhost:6379")

app.post("/notification",async(req,res)=>{
    const payload = {
        title:req.body.title|| "this is tittle",
        createdAt:new Date().toISOString(),
    }
    
    const reciver = await publisher.publish("notification",JSON.stringify(payload))
    res.json({message:"wasd",rev:reciver})
    
})


app.listen("3031",()=>{
    console.log("connected")
})