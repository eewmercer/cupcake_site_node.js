const cupcake = require("../models/cupcake");
const users = require("../models/user_cart");
const session = require('express-session');

exports.getLoginPage = ('/', (req, res, next) => {
  res.render(`login`)
});

exports.postLoginPage = ('/login',  (req, res, next) => {
  // const isLoggedIn = req
  //   .get('Cookie')
  //   .split(';')[1]
  //   .trim()
  //   .split('=')[1];

  const username = req.body.username;
  users.findOne({username: username})
    .then((user) => {
      if(!user) {
        return res.redirect('/register')
      }

      req.session.user = user; // Store user in session
      req.session.save(err => { // Ensure session is saved
        if (err) {
          console.error("Session save error:", err);
          return res.redirect('/login');
        }
          res.redirect('/system'); 
      });
    })
})

exports.postRegisterPage = ('/register',  (req, res, next) => {
  const user = new users({
    username: req.body.username,
    password: req.body.password
  });
  user.save()
    .then(result => {
      console.log('Registered User');
      console.log(user)
      req.session.user = user; // Store user in session
      req.session.save(err => { // Ensure session is saved
        if (err) {
          console.error("Session save error:", err);
          return res.redirect('/login');
        }
          res.redirect('/system'); 
      });
    })
    .catch(err => {
      console.log(err);
    });
})

exports.getRegisterPage = ('/register', (req, res, next) => {
  res.render(`register`)
});

exports.getAddCupcakePage = ('/system', (req, res, next) => {
  // res.render(`system`)
  if (!req.session.user) {
    return res.redirect('/login'); // Redirect if session is missing
  }

  res.render('system', {
      user: req.session.user, // Pass user from session
      pageTitle: 'Home'
  });
});

exports.getAboutPage = ('/about', (req, res, next) => {
  // console.log(req.get('Cookie'));
  cupcake.find()
  .then(cupcakes => {
    res.render('about', {
      cupcakes: cupcakes,
      pageTitle: `Delicious Cupcakes`,
      path: '/about'
    });
  })
  .catch(err => {
    console.log(err);
  });
});

