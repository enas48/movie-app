const express = require("express");
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors({
  origin:'https://movie-p99c.onrender.com/', //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}))
const bookmarkRouter = require('./routes/BookmarkRoutes');
const favouriteRouter=require('./routes/favouriteRoutes');
const userRouter = require('./routes/userRoutes');
const profileRouter = require('./routes/porfileRoutes');

app.get('/', (req, res)=>{
    res.send('hi');
})
// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');

  next();
});


app.use('/bookmarks',bookmarkRouter );
app.use('/favourites',favouriteRouter );
app.use('/users',userRouter );
app.use('/profile',profileRouter );

//handling errors on routers
app.use((error, req, res, next)=>{ 
    if(res.headerSent){
        return next(error); 
    }
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured'});
});


app.listen(port, ()=> console.log(`server started on port ${port}`));