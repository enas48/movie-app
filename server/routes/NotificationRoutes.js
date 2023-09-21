const express = require('express')
const router = express.Router()
const {
  getAllNotifications,
  deleteNotification,
  markOneNotificationasread,
  deleteAllNotifications,
  markAllNotificationsAsRead
} = require('../controllers/notificationController')
const { protect } = require('../middleware/authMiddleware')

router
  .route('/')
  .post(getAllNotifications)
  .delete(deleteNotification)
  .put(markOneNotificationasread)

router
  .route('/all')
  .delete(deleteAllNotifications)
  .put(markAllNotificationsAsRead)

module.exports = router
