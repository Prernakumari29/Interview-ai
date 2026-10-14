const Redis = require("ioredis");

const cacheInstance = new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    username: "default",
    password:process.env.REDIS_PASSWORD
})

cacheInstance.on("connect" , ()=>{
    console.log("redis connected")
})

cacheInstance.on("error", (error)=>{
    console.log("error in redis" , error)
})

module.exports = cacheInstance;