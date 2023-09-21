const NotificationService = require('../services/notificationService')
const Notification = require('../models/NotificationModel')
const HttpError = require('../middleware/errorMiddleware')

// @desc create notification
//@route POST /notifications
//@access private
const createNotification = async (req, res, next) => {}

//@route get /notifications/:userid
//@access private
const getAllNotifications = async (req, res, next) => {}

// @desc delete notification
//@route delete /notifications/:id
//@access private
const deleteNotification = async (req, res, next) => {}
const markOneNotificationasread = async (req, res, next) => {}
const deleteAllNotifications = async (req, res, next) => {}
const markAllNotificationsAsRead = async (req, res, next) => {}

module.exports = {
  createNotification,
  getAllNotifications,
  deleteNotification,
  markOneNotificationasread,
  deleteAllNotifications,
  markAllNotificationsAsRead
}
