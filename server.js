if(process.env.NODE_ENV !== "production"){
  require("dotenv").config()
}

//Import Libraies Start
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

app.use(express.static('public'));


initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id=> users.find(user => user.id === id)
)

const users = []

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // We want to resave the session variable in nothing is changed
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"))

//Login post Functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));


//Resgister post Functionality
app.post("/register", checkNotAuthenticated, async(req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      address: req.body.address,
      country: req.body.country,
      city: req.body.city,
      password: hashedPassword
  })
  console.log(users);
  res.redirect("/login")
  } catch (e) {
    console.log(e);
    req.redirect("/register")
  }
});

//Routes Start
app.get('/', checkAuthenticated, (req, res) => {
  res.render("index.ejs", {name: req.user.first_name})
});

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render("login.ejs")
});

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render("register.ejs")
});

//Routes End

app.delete("/logout", (req, res) => {
  req.logout(req.user, err => {
    if(err) return next("/")
  })
});

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return res.redirect("/")
  }
  next()
}

app.listen(3000)