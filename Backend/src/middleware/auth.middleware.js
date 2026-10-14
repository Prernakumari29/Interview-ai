const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const cacheInstance = require("../config/cacheInstance")

const authMiddleware = async(req,res,next)=>{

    try {
        let token =  req.cookies?.token
        console.log("cookies" , req.cookies)
        
        if(!token){
            return res.status(401).json({
                message:"token not found"
            })
        }

        let isBlacklisted = await cacheInstance.get(token);

        if(isBlacklisted){
            return res.status(401).json({
                message:"mt kr laddle"
            })
        }

        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

        if(!decode){
            return res.status(401).json({
                message:"Invalid token"
            })
        }

        

        const authUser = await userModel.findById(decode.id)

        if (!authUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        req.user = authUser
        next();
        
        
        
    } catch (error) {
         return res.status(500).json({
            message:"Internal Server Error",
            error
         })
    }

}
module.exports = authMiddleware;