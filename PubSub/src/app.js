import express from 'express'
import Redis from 'ioredis'

const app = express();
const subscriber = new Redis("redis://localhost:6379")
app.use(express.json())

subscriber.subscribe('notification',(err)=>{
    if(err){
        console.log(err);
        return 
    }
    console.log("msg sent succes")
})

subscriber.on("message",(channel,message)=>{
    console.log("recived on: ",channel," message:",message)
})

