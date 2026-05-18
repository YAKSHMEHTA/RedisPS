import express from 'express';
import Redis from 'ioredis';

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost/6379");

function generateOtp(num){
    return `otp:${num}`
}

