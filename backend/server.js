require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// --- CONFIG ---
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

console.log("✅ CLIENT_URL:", CLIENT_URL);
console.log("✅ GOOGLE_CALLBACK_URL:", GOOGLE_CALLBACK_URL);

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
    return done(null, profile);
  }
));

// --- ROUTES ---
app.get("/", (req, res) => {
  res.send("KyU-Konnect Backend API is running.");
});

app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account"
  })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
    session: true
  }),
  (req, res) => {
    res.redirect(`${CLIENT_URL}/landmark1`);
  }
);

app.get("/auth/google/failure", (req, res) => {
  res.status(401).send("Google Authentication Failed");
});

app.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return res.status(500).send("Logout failed"); }
    res.redirect(CLIENT_URL);
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
);

module.exports = app;

