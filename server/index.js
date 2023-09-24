const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 8000
const socketio = require('socket.io')
const profileService = require('./services/profileService')
const NotificationService = require('./services/notificationService')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: '*' }))

const bookmarkRouter = require('./routes/BookmarkRoutes')
const favouriteRouter = require('./routes/favouriteRoutes')
const watchedRouter = require('./routes/WatchedRoutes')
const userRouter = require('./routes/userRoutes')
const profileRouter = require('./routes/porfileRoutes')
const commentRouter = require('./routes/CommentRoutes')
const notificationRouter = require('./routes/NotificationRoutes')

app.get('/', (req, res) => {
  res.send('hi')
})
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE')

  next()
})

app.use('/bookmarks', bookmarkRouter)
app.use('/favourites', favouriteRouter)
app.use('/watched', watchedRouter)
app.use('/users', userRouter)
app.use('/profile', profileRouter)
app.use('/comments', commentRouter)
app.use('/notifications', notificationRouter)

//handling errors on routers
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || 'An unknown error occured' })
})

// Start server
const server = app.listen(port, () =>
  console.log(`server started on port ${port}`)
)
const io = socketio(server, {
  cors: {
    origin: '*'
  }
})
// Socket.IO
let onlineUser = []
io.on('connection', socket => {
  console.log(`Socket ${socket.id} connected`)
  socket.on('setUserId', async userId => {
    if (userId) {
      const oneUser = await profileService.getUser(userId)
      if (oneUser) {
        onlineUser[userId] = socket
        console.log(`⚡ Socket: User with id ${userId} connected`)
      } else {
        console.log(`🚩 Socket: No user with id ${userId}`)
      }
    }
  })
  socket.on('getNotificationsLength', async userId => {
    const notifications = await NotificationService.getNotificationByUserId(
      userId
    )
    onlineUser[userId]?.emit('notificationsLength', notifications.length || 0)
  })

  socket.on('disconnect', userId => {
    console.log(`Socket ${socket.id} disconnected`)
    onlineUser[userId] = null
  })
})
exports.io = io
