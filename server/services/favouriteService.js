const Favourite = require('../models/FavouriteModal')

exports.getFavouriteByUserId = async userId => {
  return await Favourite.find({ userId }).select('-user')
}

exports.createFavourite= async favourite => {
  return await Favourite.create(favourite)
}
exports.getFavouriteById = async (id,userid) => {
  return await Favourite.findOne({favourite_id:id,userId:userid})
}


exports.deleteFavourite = async (id,userid) => {
  return await Favourite.deleteOne({favourite_id:id,userId:userid})
}
