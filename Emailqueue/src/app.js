import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379")

const QUEUE_KEY = 'queue:email'

app.post("/email",async(req,res)=>{
    const job = {
        to:req.body.to,
        subject:req.body.subject,
        body:req.body.body,
        createdat: new Date().toISOString()
    }
    await redis.lpush(QUEUE_KEY,JSON.stringify(job));
    return res.json({queued:true,job})
})

app.get("/getmail/prc-1",async(req,res)=>{
    const rawform = await redis.rpop(QUEUE_KEY);
    if(!rawform){
        res.json({msg:"no mail found"});
    }
    const job = JSON.parse(rawform);
    return res.json({msg:'email sent',job});
})



app.listen("3000",()=>{
    console.log("app is running on port 3000")
})
