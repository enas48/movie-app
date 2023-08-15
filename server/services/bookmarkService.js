const Bookmark = require('../models/BookmarkModel')

exports.getBookmarkByUserId = async userId => {
  return await Bookmark.find({ userId }).select('-user')
}

exports.createBookmark = async bookmark => {
  return await Bookmark.create(bookmark)
}
exports.getBookmarkById = async (id,userid) => {
  return await Bookmark.findOne({bookmark_id:id,userId:userid})
}


exports.deleteBookmark = async (id,userid) => {
  return await Bookmark.deleteOne({bookmark_id:id,userId:userid})
}
