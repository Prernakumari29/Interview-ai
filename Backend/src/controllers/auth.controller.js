const userModel = require("../models/user.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const app = require("../app");


// -----------------------------------------------register user------------------------------------------
const registerUser = async(req,res)=>{

    const {username, email , password }= req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            message:"all fields are required"
        })

    } 

    const isExisted = await userModel.findOne({email})
    if(isExisted){
        return res.status(400).json({
            message:"account already exists"
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({id:user._id }, process.env.JWT_SECRET_KEY , {expiresIn: "1d"} )

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
});

    

    res.status(201).json({
        message:"user registered successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

// -------------------------------------login user------------------------------------------

const loginUser = async(req,res)=>{

    const {email ,  password} = req.body

    if(!email || !password){
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const isExisted = await userModel.findOne({email})

    if(!isExisted){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , isExisted.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid email or password"
        })
    }

    const token = jwt.sign({id:isExisted._id }, process.env.JWT_SECRET_KEY , {expiresIn: "1d"} )

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
});

    res.status(200).json({
        message:"user loggedIn successfully",
        isExisted:{
            id:isExisted._id,
            username:isExisted.username,
            email:isExisted.email
        }

    })
}

// ---------------------------------------------------Me api-----------------------------------------------

const getMeController = async(req,res)=>{
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"user details fetched successfully",
        user:{
            id:user._id,
            username: user.username,
            email: user.email

        }
    })

}



module.exports = {
    registerUser,
    loginUser,
    getMeController
}