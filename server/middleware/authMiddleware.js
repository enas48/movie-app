const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const HttpError = require("./errorMiddleware");
require('dotenv').config();

const protect = async(req,res,next) => {
let token;
    try {
        //get token from header
        token = req.headers.authorization.split(" ")[1]
        //verify token
        const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`);
        //get user from token
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch(err){
        const error = new HttpError('Not authorized', 401);
        return next(error);
    }
if(!token){
    const error = new HttpError('Not authorized, no token' , 401);
    return next(error);
}
}
module.exports = {protect}