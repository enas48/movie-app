const Watched = require('../models/WatchedModel')

exports.getWatchedByUserId = async userId => {
  return await Watched.find({ userId })
}

exports.createWatched = async watched => {
  return await Watched.create(watched)
}
exports.getWatchedById = async (id,userid) => {
  return await Watched.findOne({watched_id:id,userId:userid})
}


exports.deleteWatched = async (id,userid) => {
  return await Watched.deleteOne({watched_id:id,userId:userid})
}
