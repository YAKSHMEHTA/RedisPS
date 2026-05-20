import express, { json } from 'express'
import Redis from 'ioredis'

const app = express()
app.use(express.json())

const redis = new Redis("redis://localhost:6379")

app.post("/user/:id/json",async(req,res)=>{
    await redis.set(`user:${req.params.id}:json`,JSON.stringify(req.body))
    res.json({msg:"sucess"});
})

app.get("/user/:id/getjson",async(req,res)=>{
    const raw = await redis.get(`user:${req.params.id}:json`,)
    res.json({users: raw ? JSON.parse(raw):null})
})

app.listen("3030",()=>{
    console.log("app is running on port 3030")
})