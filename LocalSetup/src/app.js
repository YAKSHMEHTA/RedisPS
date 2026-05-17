import express from 'express';
import Redis from 'ioredis';
import mongoose from 'mongoose';

const app = express();

const redis = new Redis('redis://localhost:6379');

app.get("/redis",async(req,res)=>{
    const reply = await redis.ping();
    res.json({redis:reply})
})

app.get("/mongoose",async(req,res)=>{
    const url = 'mongodb://localhost:27017/redisps'
    if(mongoose.connection.readyState === 0){
        await mongoose.connect(url)
        .then(()=>{
            console.log("connected");
        })
    }
    res.json({reply:"connected",database:mongoose.connection.name})
})  

app.listen('8080',()=>{
    console.log("app is listening on port 8080");
})