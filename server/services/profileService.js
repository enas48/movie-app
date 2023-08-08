const Profile = require("../models/ProfileModel");

exports.getAllProfiles = async () => {
  return await Profile.find().select('-user');
};
exports.getProfileByUserId = async (userId) => {
    return await Profile.findOne({userId:userId}).populate({path:'user',select:'-password'});
  };

exports.createProfile = async (profile) => {
  return await Profile.create(profile);
};
exports.getProfileById = async (id) => {
  return await Profile.findById(id);
};

exports.updateProfile = async (id, profile) => {
  return await Profile.findByIdAndUpdate(id, profile,{new:true}).select('-user');;
};

exports.deleteProfile = async (id) => {
  return await Profile.findByIdAndDelete(id);
};
