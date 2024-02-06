//Import Libraies Start
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config")

initializePassport(
  passport,
  email => users.find(user => user.email == email)
)

const users = []

app.use(express.urlencoded({extended: false}));

app.post("/register", async(req, res) => {
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
app.get('/', (req, res) => {
  res.render("index.ejs")
});

app.get('/login', (req, res) => {
  res.render("login.ejs")
});

app.get('/register', (req, res) => {
  res.render("register.ejs")
});

//Routes End

app.listen(3000)