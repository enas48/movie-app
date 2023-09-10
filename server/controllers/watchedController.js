const watchedService = require('../services/watchedService')
const User = require('../models/UserModel')
const HttpError = require('../middleware/errorMiddleware')

// @desc create watched
//@route POST /watched
//@access private
const createWatched = async (req, res, next) => {
  try {
    const {  watched_id, userId,type} = req.body
    const watched = await watchedService.createWatched({
      watched_id,
      userId,
      type
    })
    res
      .status(200)
      .json({ watched: watched, message: 'Watched Added Successfully',status: 200 })
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

//@route get /watched/:userid
//@access private
const getWatchedByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userid
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
    } else {
      const watched = await watchedService.getWatchedByUserId(userId)
      res.status(200).json({ watched, message: `get watched` })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc delete watched
//@route delete /watched/:id
//@access private
const deleteWatched= async (req, res, next) => {
  try {
    const watched = await watchedService.getWatchedById(req.params.id, req.params.userId)
    if (!watched) {
      const error = new HttpError('watched not found', 400)
      return next(error)
    } else {
      await watchedService.deleteWatched(req.params.id, req.params.userId)
      res.status(200).json({ message: `watched deleted successfully` ,status: 200})
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}
module.exports = {
  createWatched,
  getWatchedByUserId,
  deleteWatched
}
