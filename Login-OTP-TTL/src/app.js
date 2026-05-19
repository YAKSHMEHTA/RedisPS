import express from "express";
import Redis from "ioredis";

const app = express();
app.use(express.json());

const redis = new Redis("redis://localhost:6379");

function generateOtp(num) {
  return `otp:${num}`;
}

app.post("/getotp", async (req, res) => {
  try {
    if (redis.status !== 'ready') {
       return res.status(503).json({ error: 'Redis unavailable' });
   }
    let { num } = req.body;

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    console.log(otp);

    await redis.set(generateOtp(num), otp, "EX", 30);

    return res.json({
      otpset: "otpsend",
      otpis: otp,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

app.post("/otp/verify", async (req, res) => {
  try {
    let { num, otp } = req.body;
    if (redis.status !== 'ready') {
       return res.status(503).json({ error: 'Redis unavailable' });
   }
    const savedotp = await redis.get(generateOtp(num));
    if (!savedotp) {
      return res.json({ msg: "otp not found" });
    }

    if (savedotp === otp.toString()) {
      return res.json({ msg: "you are verified" });
    }

    return res.json({ msg: "wrong otp" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
});

app.listen("3000", () => {
  console.log("App running on port");
});
