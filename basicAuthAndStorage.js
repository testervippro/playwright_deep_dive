import express from "express";
import basicAuth from "basic-auth";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Simple session to track if user logged in via form
app.use(session({
  secret: "secret-key",
  resave: false,
  saveUninitialized: true,
}));

// Step 1: Basic Auth middleware
function basicAuthMiddleware(req, res, next) {
  const user = basicAuth(req);

  if (!user || user.name !== "admin" || user.pass !== "admin") {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Basic authentication required.");
  }
  next();
}

// Root route → requires Basic Auth, then goes to /login
app.get("/", basicAuthMiddleware, (req, res) => {
  res.redirect("/login");
});

// Step 2: Show login form (after Basic Auth)
app.get("/login", basicAuthMiddleware, (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Login</button>
    </form>
  `);
});

// Step 2: Handle login form (hardcoded check)
app.post("/login", basicAuthMiddleware, (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    req.session.loggedIn = true;
    return res.redirect("/dashboard");
  }

  res.send("Invalid credentials. Try again.");
});

// Step 3: Protected Dashboard
app.get("/dashboard", basicAuthMiddleware, (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  res.send("Hello Dashboard");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
// Add to test fodler 
// import { test, expect } from '@playwright/test';

// test.describe.serial('auth flow', () => {
//   test('login with basic auth + form and save storage state', async ({ browser }) => {
//     const context = await browser.newContext({
//       httpCredentials: {
//         username: 'admin',
//         password: 'admin',
//       },
//     });
//     const page = await context.newPage();

//     await page.goto('http://localhost:3000');
//     await page.fill('input[name="username"]', 'admin');
//     await page.fill('input[name="password"]', 'admin');
//     await page.click('button[type="submit"]');

//     await page.waitForURL('**/dashboard');
//     await expect(page.locator('body')).toContainText('Hello Dashboard');

//     await context.storageState({ path: 'storageState.json' });
//     await context.close();
//   });

  
//   test('reuse saved storage state', async ({ browser }) => {
//     const context = await browser.newContext({ storageState: 'storageState.json' ,
//         httpCredentials: {
//         username: 'admin',
//         password: 'admin',
//       },
//     });
//     const page = await context.newPage();

//     await page.goto('http://localhost:3000/dashboard');
//     await expect(page.locator('body')).toContainText('Hello Dashboard');

//     await context.close();
//   });
// });
