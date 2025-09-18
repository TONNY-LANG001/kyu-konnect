const express = require("express");
const router = express.Router();

// Sample data
const hostels = [
  { id: 1, name: "Kutus Premier Hostel", price: 6000, contact: "0712345678", distance: "300m from campus" },
  { id: 2, name: "Comrade Towers", price: 5500, contact: "0798765432", distance: "250m from campus" }
];

// GET all hostels
router.get("/", (req, res) => {
  res.json(hostels);
});

module.exports = router;
