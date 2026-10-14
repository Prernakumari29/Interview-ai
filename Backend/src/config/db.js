const mongoose = require("mongoose")

const connected = async ()=>{
    try {
        const res = await mongoose.connect(process.env.MONGO_URI);
        
        console.log("mongodb connected")
        
    } catch (error) {
        console.log("error in connecting mongodb " , error)
    }
}

module.exports = connected;