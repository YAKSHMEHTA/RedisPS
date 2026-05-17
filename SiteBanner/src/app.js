import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");

const bannerKey = "app:banner";

app.post("/banner",async(req,res)=>{
    try{
        await redis.set(bannerKey,req.body.message || "Welcome to redis");
    }
    catch(e){
        console.log(e)
    }
    res.json({res:"sucess"});
})

app.get("/banner",async(req,res)=>{
    try {
        const message = await redis.get(bannerKey);
        res.json({res:message});
    } catch (e) {
        console.log(e);
    }
    
    
})


app.listen(8000,()=>{
    console.log("App is Listening on port 8080");
})