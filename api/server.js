import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

let issues = []; // in-memory store
const USERS = [{ username: "admin", password: "admin" }];

// Middleware: check login
function requireAuth(req, res, next) {
  if (req.cookies?.auth === "true") {
    return next();
  }

  // API requests → return 401 JSON
  if (req.path.startsWith("/api")) {
    return res.status(401).json({ error: "Unauthorized - Please login" });
  }

  // UI requests → redirect to login page
  return res.redirect("/login");
}

// Login page (UI)
app.get("/login", (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Login</h1>
        <form action="/ui-login" method="post">
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      </body>
    </html>
  `);
});

// UI login handler
app.post("/ui-login", (req, res) => {
  const { username, password } = req.body;
  const valid = USERS.find(u => u.username === username && u.password === password);
  if (valid) {
    res.cookie("auth", "true");
    res.redirect("/");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// API login handler
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const valid = USERS.find(u => u.username === username && u.password === password);
  if (valid) {
    res.cookie("auth", "true");
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// Protected UI route
app.get("/", requireAuth, (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Issues</h1>
        <ul id="issue-list">
          ${issues.map((i) => `<li>${i.title}</li>`).join("")}
        </ul>
        <form action="/ui-create" method="post">
          <input type="text" name="title" placeholder="New issue" />
          <button type="submit">Add</button>
        </form>
      </body>
    </html>
  `);
});

// Protected API: list issues
app.get("/api/issues", requireAuth, (req, res) => {
  res.json(issues);
});

// Protected API: create issue
app.post("/api/issues", requireAuth, (req, res) => {
  const issue = { id: issues.length + 1, title: req.body.title };
  issues.push(issue);
  res.json(issue);
});

// UI form submit creates issue internally
app.post("/ui-create", requireAuth, (req, res) => {
  const issue = { id: issues.length + 1, title: req.body.title };
  issues.push(issue);
  res.redirect("/");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
