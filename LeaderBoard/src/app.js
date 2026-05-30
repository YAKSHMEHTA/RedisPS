import express from "express";
import Redis from "ioredis";

const app = express();
const redis = new Redis("redis://localhost:6379");

app.use(express.json());

app.post("/post/:id", async (req, res) => {
    const id = req.params.id;

    await redis.hset(`user:${id}`, {
        ...req.body,
        view: 0
    });

    res.json({ msg: "success" });
});

app.get("/view/:id", async (req, res) => {
    const id = req.params.id;

    await redis.hincrby(`user:${id}`, "view", 1);

    res.send("viewed");
});

app.get("/data/:id", async (req, res) => {
    const id = req.params.id;

    const data = await redis.hgetall(`user:${id}`);

    if (Object.keys(data).length === 0) {
        return res.status(404).send("user not found");
    }

    res.json(data);
});

app.listen(3030, () => {
    console.log("app is running on port 3030");
});