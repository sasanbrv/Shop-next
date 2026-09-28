import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const PORT = 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// =======================
// Middleware
// =======================

app.use(express.json());
app.use(cookieParser());

// =======================
// User
// =======================

const user = {
  username: "admin",
  password: "1234",
};

// =======================
// Authentication Middleware
// =======================

const checkAuth = (req, res, next) => {
  const sessionId = req.cookies.sessionId;

  if (sessionId !== "abc123") {
    return res.status(401).json({
      message: "You are not authenticated",
    });
  }

  next();
};

// =======================
// Home
// =======================

app.get("/", (req, res) => {
  res.send("Hello from Backend!");
});

// =======================
// Login
// =======================

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  app.post("/logout", (req, res) => {
  res.clearCookie("sessionId", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    message: "Logout successful!",
  });
});

  // Check username and password
  if (
    username !== user.username ||
    password !== user.password
  ) {
    return res.status(401).json({
      message: "Username or password is incorrect",
    });
  }

  // Create Cookie
  res.cookie("sessionId", "abc123", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    message: "Login successful!",
  });
});

// =======================
// Check Cookie
// =======================

app.get("/check-cookie", (req, res) => {
  console.log(req.cookies);

  res.json(req.cookies);
});

// =======================
// Dashboard
// =======================

app.get("/dashboard", checkAuth, (req, res) => {
  res.json({
    message: "Welcome to Dashboard!",
  });
});

// =======================
// Start Server
// =======================

app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});