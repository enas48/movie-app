const NotificationService = require("../services/notificationService");
const HttpError = require("../middleware/errorMiddleware");
const User = require("../models/UserModel");
const profileService = require("../services/profileService");
const main = require("../index");

// @desc create notification
//@route POST /notifications
//@access private
const createNotification = async (req, res, next) => {
  try {
    const { senderUser, userId, type, text, read, link, commentId} = req.body;
    const notification = await NotificationService.createNotification({
      senderUser,
      userId,
      type,
      text,
      read,
      link,
      commentId
    }); 
    main.io.emit("set-notification", notification);

    res.status(200).json({
      notification,
      message: "notification Added Successfully",
      status: 200,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
// @desc Get all notifications
//@route get /notifications/:id
//@access private
const getAllNotifications = async (req, res, next) => {
  try { 
    const userId = req.params.userId;
    const user = await User.findById(userId);

    //check for  user
    if (!user) {
      const error = new HttpError("user not found", 401);
      return next(error);
    }
    const notifications = await NotificationService.getNotification(userId);
    if (!notifications) {
      const error = new HttpError("No notifications found", 401);
      return next(error);
    }
    res.status(200).json({ notifications });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc delete notification
//@route delete /notifications
//@access private
const deleteNotification = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new HttpError("You must give a valid id", 401);
      return next(error);
    }
    const deleteNotification = await NotificationService.getNotificationById(
      id
    );
    if (!deleteNotification) {
      const error = new HttpError(
        `Can't find a notification with id: ${id}`,
        400
      );
      return next(error);
    }
    const result = await NotificationService.deleteNotification(id);
    if (!result) {
      const error = new HttpError(
        `Can't delete the notification with id: ${id}`,
        400
      );
      return next(error);
    }
    res
      .status(200)
      .json({ message: `Notification deleted successfully`, status: 200 });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc delete All notification
//@route delete /notifications/all
//@access private
const deleteAllNotifications = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new HttpError("You must give a valid id", 401);
      return next(error);
    }
    const user = await User.findById(userId);

    //check for  user
    if (!user) {
      const error = new HttpError("user not found", 401);
      return next(error);
    }
    const result = await NotificationService.deleteNotificationByUserId(userId);
    if (!result) {
      const error = new HttpError(
        `Error Deleting all notifications as read ${userId}`,
        400
      );
      return next(error);
    }
    res.status(200).json({
      message: `All notifications for user ${userId} marked was deleted`,
      status: 200,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

// @desc  Mark One Notification As Read
//@route put /notifications
//@access private
const markOneNotificationasread = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new HttpError("You must give a valid id", 401);
      return next(error);
    }
    const updateNotification = await NotificationService.updateNotification(
      id,
      { read: true }
    );
    if (!updateNotification) {
      const error = new HttpError(`Error Mark notifications as read`, 400);
      return next(error);
    }
    res.status(200).json({
      updateNotification,
      message: `Notification updated successfully`,
      status: 200,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};
// @desc  Mark All Notification As Read
//@route put /notifications/all
//@access private

const markAllNotificationsAsRead = async (req, res, next) => {
  try {
    const { userId } = req.body;
    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      const error = new HttpError("You must give a valid id", 401);
      return next(error);
    }
    const user = await User.findById(userId);

    //check for  user
    if (!user) {
      const error = new HttpError("user not found", 401);
      return next(error);
    }

    const updateNotification = await NotificationService.updateAllNotification(
      userId
    );
    if (!updateNotification) {
      const error = new HttpError(
        `Error Marking all notifications as read`,
        400
      );
      return next(error);
    }
    res.status(200).json({
      message: `All notifications for user ${userId} marked as read`,
      status: 200,
    });
  } catch (err) {
    const error = new HttpError(err.message, 500);
    return next(error);
  }
};

module.exports = {
  createNotification,
  getAllNotifications,
  deleteNotification,
  markOneNotificationasread,
  deleteAllNotifications,
  markAllNotificationsAsRead,
};
