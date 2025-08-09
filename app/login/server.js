const express = require('express');
const cookieParser = require('cookie-parser');
const { chromium } = require('playwright');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Simulate Login Page
app.get('/', (req, res) => {
  if (req.cookies.username) return res.redirect('/dashboard');
res.send(`
  <form method="post" action="/login">
    <label for="username">User Name</label>
    <input id="username" name="username">
    
    <label for="password">Password</label>
    <input id="password" name="password" type="password">
    
    <button id="submit-btn" type="submit">Sign in</button>
  </form>
`);

});

// Handle Login
app.post('/login', (req, res) => {
  if (req.body.username === 'user' && req.body.password === 'password') {
    res.cookie('username', req.body.username);
    return res.redirect('/dashboard');
  }
  res.send('Invalid');
});

// Dashboard
app.get('/dashboard', (req, res) => {
  if (!req.cookies.username) return res.redirect('/');
  res.send(`<h1>Welcome, ${req.cookies.username}</h1>`);
});

// Reset Cookies
app.get('/reset', (req, res) => {
  res.clearCookie('username');
  res.redirect('/');
});


const server = app.listen(port, async () => {
  console.log(` App running at http://localhost:${port}`);

  
});
