const Profile = require("../models/ProfileModel");
const User= require("../models/UserModel");

exports.getAllProfiles = async () => {
  return await Profile.find().select('-user');
};
exports.getProfileByUserId = async (userId) => {
    return await Profile.findOne({user:userId}).populate({path:'user',select:'-password'});
  };

exports.createProfile = async (profile) => {
  return await Profile.create(profile);
};
exports.getProfileById = async (id) => {
  return await Profile.findById(id).populate({path:'user',select:'-password'});
};

exports.updateProfile = async (id, profile) => {
  return await Profile.findByIdAndUpdate(id, profile,{new:true}).select('-user');;
};
exports.updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data,{new:true}).select('-password');;
};


exports.deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};
