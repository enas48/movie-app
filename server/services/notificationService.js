const Notification = require('../models/NotificationModel')

exports.getNotificationByUserId = async (userId, read) => {
  return await Notification.find({ userId, read }).lean()
}

exports.createNotification= async notification => {
    return await Notification.create(notification)
  }
