const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/UserModel')
const HttpError = require('../middleware/errorMiddleware')
const profileService = require('../services/profileService')
require('dotenv').config();

// @desc create user
//@route POST /users
//@access public
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
      const error = new HttpError('Please fill all fields', 400)
      return next(error)
    } else {
      //check if user exist
      const userExist = await User.findOne({ email })
      if (userExist) {
        const error = new HttpError('User already exists login instead', 400)
        return next(error)
      } else {
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //create user
        const user = await User.create({
          username,
          email,
          password: hashedPassword
        })
        if (user) {
          //create profile
           await profileService.createProfile({
            image: '',
            user:user.id
        
          })
          res.status(200).json({
            data: {
              _id: user.id,
              username: user.username,
              email: user.email,
              token: generateToken(user._id)
            },
            message: 'Account Created Successfully'
            ,status: 200
          })

        } else {
          const error = new HttpError('invaild user data', 400)
          return next(error)
        }
      }
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc login user
//@route POST /users/login
//@access public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    //check if user exist
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
          token: generateToken(user._id),
          expire: '30d'
        },
        message: 'logged in Successfully',
        status: 200
      })
  
    } else {
      const error = new HttpError('Email or Password incorrect', 400)
      return next(error)
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc get user
//@route GET /users/:id
//@access private
const getUser = async (req, res, next) => {
  try {
    const { _id, username, email } = await User.findById(req.user.id)
    res.status(200).json({ id: _id, username, email, message: 'user data' ,status: 200 })
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

//generate jwt
const generateToken = id => {
  return jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
    expiresIn: '30d'
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  generateToken
}
