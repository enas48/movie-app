const Bookmark = require('../models/BookmarkModel')

exports.getBookmarkByUserId = async userId => {
  return await Bookmark.find({ userId }).select('-user')
}

exports.createBookmark = async bookmark => {
  return await Bookmark.create(bookmark)
}
exports.getBookmarkById = async id => {
  return await Bookmark.findById(id)
}

exports.deleteBookmark = async id => {
  return await Bookmark.findByIdAndDelete(id)
}
