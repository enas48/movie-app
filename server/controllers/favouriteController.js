const favouriteService = require("../services/favouriteService");
const User = require("../models/UserModel");
const HttpError = require("../middleware/errorMiddleware");

// @desc create favourite
//@route POST /favourites
//@access private
const createFavourite = async (req, res, next) => {
  try {
    const { favourite_id, userId, type } = req.body;
    const favourite = await favouriteService.createFavourite({
      favourite_id,
      userId,
      type,
    });
    res
      .status(200)
      .json({
        favourite: favourite,
        message: "favourite Added Successfully",
        status: 200,
      });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

//@route get /favourites/:userid
//@access private
const getFavouritesByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userid;
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const error = new HttpError("user not found", 401);
      return next(error);
    }
    const user = await User.findById(userId);

    //check for  user
    if (!user) {
      const error = new HttpError("user not found", 401);
      return next(error);
    } else {
      const favourite = await favouriteService.getFavouriteByUserId(userId);
      res.status(200).json({ favourite, message: `get favourite` });
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc delete favourite
//@route delete /favourites/:id
//@access private
const deleteFavourite = async (req, res, next) => {
  try {
    const favourite = await favouriteService.getFavouriteById(
      req.params.id,
      req.params.userId
    );
    if (!favourite) {
      const error = new HttpError("favourite not found", 400);
      return next(error);
    } else {
      await favouriteService.deleteFavourite(req.params.id, req.params.userId);
      res
        .status(200)
        .json({ message: `favourite deleted successfully`, status: 200 });
    }
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
module.exports = {
  createFavourite,
  getFavouritesByUserId,
  deleteFavourite,
};
