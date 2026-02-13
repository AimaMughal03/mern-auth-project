const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const SECRET = process.env.SECRET;

const User = require("../models/user");

exports.register = async(req, res) => {

    const {username, email, password} = req.body;

    try {

        const schema = joi.object({
            username: joi.string().min(3).required(),
            email: joi.string().email().required(),
            password: joi.string().min(6).pattern(/[a-zA-Z]/).pattern(/[0-9]/).required(),
        })

        const {error} = schema.validate(req.body);

        if(error){
            return res.status(400).send({
                isSuccess: false,
                message: error.details[0].message
            })
        }
        

        const findUser = await User.findOne({
            $or: [{ email}, {username}]
        }) 

        if(findUser){
            return res.status(409).send({
                isSuccess: false,
                message:"Username or Email already exist"
            })
        }



        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({username, email, password:hashedPassword});

        await user.save();

        res.send({
            isSuccess: true,
            message:"User Registered Successfully"
        })
        
    } catch (error) {

         res.status(500).send({
            isSuccess:false,
            message:"Server error"
        })
    }
}


exports.login = async(req, res) => {
    
    const {email, password} = req.body;

    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).pattern(/[a-zA-Z]/).pattern(/[0-9]/).required(),
    })

    const {error} = schema.validate(req.body);

    if(error){
        return res.status(400).send({
            isSuccess: false,
            message: error.details[0].message
        })
    }

    const findUser = await User.findOne({ email});

    if(!findUser){

        return res.status(404).send({
            isSuccess:false,
            message:"User not found"
        })
    }

    const matchPassword =await bcrypt.compare(password, findUser.password);

    if(!matchPassword){

        return res.status(400).send({
            isSuccess: false,
            message:"Password does not match"
        })
    }

    const payload = {
        user: {id: findUser._id, email: findUser.email}
    }

    const token = jwt.sign(payload, SECRET, {expiresIn:"1h"});


    res.send({
        isSuccess:true,
        token
    })
}


exports.getUser = async(req, res) => {

    const users = await User.find().select("-password");

    res.send({
        isSuccess:true,
        data: users
    })
}
