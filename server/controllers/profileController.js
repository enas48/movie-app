const profileService = require("../services/profileService");
const User = require("../models/UserModel");
const HttpError = require("../middleware/errorMiddleware");
var mongoose = require('mongoose');


// @desc get profiles
//@route GET /profiles
//@access public
const getProfiles= async (req, res, next) => {
  try {
    const profiles = await profileService.getAllProfiles();
    res.status(200).json({ profiles: profiles, message: "Get profiles" });
  } catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);
  } 
}
// @desc create profile
//@route POST /profiles
//@access private
const createProfile = async (req, res, next) => {
  try {
    
    const {bio, aboutme, yearsOfExp, frontendExperiences, backendExperiences, otherExperiences, user} = req.body;
    const profileExisit= await profileService.getProfileByUserId(user);
    if(profileExisit){
        res.status(200).json({ message: "Profile already exist" });
    }else{
        const profile = await profileService.createProfile({bio, aboutme, yearsOfExp, frontendExperiences, backendExperiences, otherExperiences, user});
        res.status(200).json({profile: profile, message: "Profile Created Successfully" });
    }
  
  
} catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);

  }
}
// @desc get profile
//@route GET /profiles/:id
//@access private
const getProfileById = async (req, res, next) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    if(!profile){
      const error = new HttpError( 'profile not found' , 400);
      return next(error);
     
    } else{
    res.status(200).json({profile: profile, message: `find profile ${req.params.id}` });
    } 
      } catch (err) {
        const error = new HttpError( err.message , 500);
        return next(error);
  }
}
// @desc update profile
//@route get /profiles/userprofile
//@access private
const getProfileByUserId = async (req, res, next) => {
  
    try {
      const userId= req.params.userid;
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError('user not found' , 401);
        return next(error);
      }
      const user = await User.findById(userId);

      //check for  user 
      if(!user){
        const error = new HttpError('user not found' , 401);
        return next(error);
      }else{
        const profile = await profileService.getProfileByUserId(userId);
        res.status(200).json({ profile:profile, message: `get profile` }); 
      }
 
    
    } catch (err) {
      const error = new HttpError( err.message , 500);
      return next(error);
    } 
  }

// @desc update profile
//@route put /profiles/:id
//@access private
const updatedProfile = async (req, res, next) => {
  try {
    const userId= req.body.user;
    const profile = await profileService.getProfileById(req.params.id);
    if(!profile){
      const error = new HttpError('profile not found' , 400);
      return next(error);
    } else{
        if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const error = new HttpError('user not found' , 401);
            return next(error);
          }
    const user = await User.findById(userId);
    //check for  user 
    if(!user){
      const error = new HttpError('user not found' , 401);
      return next(error);
    }
    //make sure user is logged in match profile user
    if(profile.user.toString() !== user.id){
      const error = new HttpError( 'user not authorized' , 401);
      return next(error);
    }

    const {bio, aboutme, yearsOfExp, frontendExperiences, backendExperiences, otherExperiences} = req.body;
    const updatedProfile = await profileService.updateProfile(req.params.id,{bio, aboutme, yearsOfExp, frontendExperiences, backendExperiences, otherExperiences} );

    res.status(200).json({ profile:updatedProfile, message: `profile updated successfully` }); 
    }
  } catch (err) {
    const error = new HttpError( err.message , 500);
    return next(error);
  } 
}

module.exports = {
  getProfiles,
  getProfileByUserId,
  createProfile,
  getProfileById,
  updatedProfile,
  
};
