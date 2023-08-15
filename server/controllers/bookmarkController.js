const bookmarkService = require('../services/bookmarkService')
const User = require('../models/UserModel')
const HttpError = require('../middleware/errorMiddleware')

// @desc create bookmark
//@route POST /bookmarks
//@access private
const createBookmark = async (req, res, next) => {
  try {
    const {  bookmark_id, userId } = req.body
    const bookmark = await bookmarkService.createBookmark({
      bookmark_id,
      userId
    })
    res
      .status(200)
      .json({ bookmark: bookmark, message: 'Bookmark Added Successfully',status: 200 })
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

//@route get /bookmarks/:userid
//@access private
const getBookmarksByUserId = async (req, res, next) => {
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
      const bookmark = await bookmarkService.getBookmarkByUserId(userId)
      res.status(200).json({ bookmark, message: `get bookmark` })
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}

// @desc delete bookmark
//@route delete /bookmarks/:id
//@access private
const deleteBookmark = async (req, res, next) => {
  try {
    const bookmark = await bookmarkService.getBookmarkById(req.params.id, req.params.userId)
    if (!bookmark) {
      const error = new HttpError('bookmark not found', 400)
      return next(error)
    } else {
      await bookmarkService.deleteBookmark(req.params.id, req.params.userId)
      res.status(200).json({ message: `bookmark deleted successfully` ,status: 200})
    }
  } catch (err) {
    const error = new HttpError(err.message, 500)
    return next(error)
  }
}
module.exports = {
  createBookmark,
  getBookmarksByUserId,
  deleteBookmark
}
