//Import Libraies Start
const express = require("express");
//Import Libraies Start

const app = express();

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