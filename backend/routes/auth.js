const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Send user info to popup window
    res.send(`<script>
      window.opener.postMessage({
        type: 'oauth-success',
        user: ${JSON.stringify(req.user)}
      }, '*');
      window.close();
    </script>`);
  }
);

// Facebook OAuth
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(`<script>
      window.opener.postMessage({
        type: 'oauth-success',
        user: ${JSON.stringify(req.user)}
      }, '*');
      window.close();
    </script>`);
  }
);

// X (Twitter) OAuth
router.get("/auth/x", passport.authenticate("twitter"));
router.get("/auth/x/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  (req, res) => {
    res.send(`<script>
      window.opener.postMessage({
        type: 'oauth-success',
        user: ${JSON.stringify(req.user)}
      }, '*');
      window.close();
    </script>`);
  }
);

// Register Buyer/Seller endpoints
router.post("/register/buyer", async (req, res) => {
  // Your registration logic here (save to DB, return user info)
});
router.post("/register/seller", async (req, res) => {
  // Your registration logic here (save to DB, return user info)
});

// Fetch current user
router.get("/api/me", (req, res) => {
  res.json({ user: req.user || null });
});

module.exports = router;
