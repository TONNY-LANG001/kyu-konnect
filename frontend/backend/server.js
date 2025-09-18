require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const app = express();

// --- CONFIG ---
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || "http://localhost:3000/auth/google/callback";

// --- MIDDLEWARE ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CORS ---
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// --- SESSION ---
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  // cookie: { secure: false } // For HTTPS, set secure: true, sameSite: 'none'
}));

// --- PASSPORT ---
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// --- GOOGLE STRATEGY ---
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
  },
  (accessToken, refreshToken, profile, done) => {
    // Optionally, save profile to DB here
    done(null, profile);
  }
));

// --- ROUTES ---

// Root
app.get("/", (req, res) => {
  res.send("KyU-Konnect Backend API is running.");
});

// Step 1: Start Google Auth
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "openid"],
    prompt: "select_account"
  })
);

// Step 2: Google redirects here after user signs in
app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    session: true
  }),
  (req, res) => {
    // On success, redirect to frontend
    res.redirect(`${CLIENT_URL}/landmark1`);
  }
);

// Failure
app.get("/auth/google/failure", (req, res) => {
  res.status(401).send("Google Authentication Failed");
});

// Get current user
app.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

// Logout
app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).send("Logout failed"); }
    res.redirect(CLIENT_URL);
  });
});

// 404 Handler (optional)
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// --- SERVER ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Backend running on http://localhost:${PORT}`)
);

// For testability/serverless
module.exports = app;
