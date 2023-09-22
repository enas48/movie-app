const express = require('express')
const router = express.Router()
const {
  createNotification,
  getAllNotifications,
  deleteNotification,
  markOneNotificationasread,
  deleteAllNotifications,
  markAllNotificationsAsRead
} = require('../controllers/notificationController')
const { protect } = require('../middleware/authMiddleware')

router
  .route('/')
  .post(createNotification)
  .delete(deleteNotification)
  .put(markOneNotificationasread)

  router
  .route('/:userId')
  .get(getAllNotifications)

router
  .route('/all')
  .delete(deleteAllNotifications)
  .put(markAllNotificationsAsRead)

module.exports = router
