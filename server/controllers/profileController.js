const profileService = require('../services/profileService')
const User = require('../models/UserModel')
const HttpError = require('../middleware/errorMiddleware')

// @desc get profile
//@route GET /profiles/:id
//@access private
const getProfileById = async (req, res, next) => {
  try {
    const profile = await profileService.getProfileById(req.params.id)
    if (!profile) {
      const error = new HttpError('profile not found', 400)
      return next(error)
    } else {
      res
        .status(200)
        .json({
          profile: profile,
          message: `find profile ${req.params.id}`,
          status: 200
        })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

//@route get /profiles/userprofile
//@access private
const getProfileByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userid
    if (!userId) {
      const error = new HttpError('Verify your data and proceed again', 401)
      return next(error)
    }
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const error = new HttpError('You must give a valid id', 401)
      return next(error)
    }
    const user = await User.findById(userId)

    //check for  user
    if (!user) {
      const error = new HttpError('user not found', 401)
      return next(error)
    } else {
      const profile = await profileService.getProfileByUserId(userId)
      res
        .status(200)
        .json({ profile: profile, message: `get profile`, status: 200 })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc update profile
//@route put /profiles/:id
//@access private
const updatedProfile = async (req, res, next) => {
  try {
    const userId = req.body.user
    const profile = await profileService.getProfileById(req.params.id)
    if (!profile) {
      const error = new HttpError('profile not found', 400)
      return next(error)
    } else {
      if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
        // Yes, it's a valid ObjectId, proceed with `findById` call.
        const error = new HttpError('user not found', 401)
        return next(error)
      }
      const user = await User.findById(userId)
      //check for  user
      if (!user) {
        const error = new HttpError('user not found', 401)
        return next(error)
      }
      //make sure user is logged in match profile user
      if (profile.user._id.toString() !== user._id.toString()) {
        const error = new HttpError('user not authorized', 401)
        return next(error)
      }

      if (!req.files['profileImage']) {
        profileImage = profile.profileImage
      } else {
        profileImage = req.files['profileImage'][0].path
      }
      if (!req.files['coverImage']) {
        coverImage = profile.coverImage
      } else {
        coverImage = req.files['coverImage'][0].path
      }
    
      await profileService.updateUser(userId, {
        username: req.body.username
      })
      const updatedProfile = await profileService.updateProfile(req.params.id, {
        profileImage: profileImage,
        coverImage: coverImage
      })

      res.status(200).json({
        profile: updatedProfile,
        message: `profile updated successfully`,
        status: 200
      })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

module.exports = {
  getProfileByUserId,
  getProfileById,
  updatedProfile
}
