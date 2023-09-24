const Notification = require('../models/NotificationModel')

exports.getNotificationByUserId = async userId => {
  return await Notification.find({ userId, read: false })
}
exports.getNotification = async userId => {
  return await Notification.find({ userId })
}
exports.getNotificationById = async id => {
  return await Notification.findById(id)
}
exports.deleteNotification = async (id) => {
  return await Notification.deleteOne({ _id: id });
};
exports.deleteNotificationComment = async (senderUser, commentId) => {
  return await Notification.deleteOne({ senderUser, commentId })
}
exports.deleteNotificationFollow = async (senderUser, userId) => {
  return await Notification.deleteOne({ senderUser, userId, type: 'follow' })
}
exports.deleteNotificationByUserId = async userId => {
  return await Notification.deleteMany({ userId })
}
exports.updateNotification = async (id, data) => {
  return await Notification.findByIdAndUpdate(id, data, { new: true })
}
exports.updateAllNotification = async userId => {
  return await Notification.updateMany({ userId }, { $set: { read: true } })
}
exports.createNotification = async notification => {
  return await Notification.create(notification)
}
