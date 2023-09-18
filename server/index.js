const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const port = process.env.PORT || 8000
const socketio = require('socket.io')

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
io.on('connection', socket => {
  console.log(`Socket ${socket.id} connected`)

  /*-------comments----------------*/
  socket.on('sendComment', comment => {
    console.log(comment)
    io.emit('comment', comment)
  })
  socket.on('deleteComment', comments => {
    console.log(comments)
    io.emit('delete-Comment', comments)
  })
  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`)
  })
})
