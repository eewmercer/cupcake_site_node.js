const express = require('express');
const bodyParser = require('body-parser');
const myRoutes = require('./routes/route')
const mongoose = require('mongoose');
const errorController = require('./controllers/error')
const path = require("path");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = 'mongodb://localhost:27017/eMercer';

const app = express();
const port = 3000;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})

app.use(session({
  secret: 'Wrigley_Clarence', 
  resave: false,
  saveUninitialized: true, 
  store: store,
  cookie: {loggedIn: true, originalMaxAge: null} 
}));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(require('./routes/route'))
app.use(express.static(path.join(__dirname, "public")))


app.use('/route', myRoutes)
app.use(errorController.get404);

mongoose.connect(
  MONGODB_URI
  )
  .then(result => {
    app.listen(port, () => {
      console.log(`Database connected.\nApp listening on port ${port}.`);
    })
  })
  .catch(err => {
    console.log(err);
  
});









  // cookie: { secure: false }

//set up cookie right OR "loggedIn:true" **THIS MAY BREAK STUFF SO PROBS REMOVE COOKIE**