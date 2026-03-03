const redis = require("redis");

const redisClient = redis.createClient({
     url: process.env.REDIS_URL
})

const connectRedis = async() => {
    try{
        await redisClient.connect();
        console.log("Redis Connected");
    } catch (error) {
        console.log(`Redis connection Failed:` , error)
    }
}

connectRedis();

module.exports = redisClient;




