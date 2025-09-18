const express = require("express");
const router = express.Router();

const events = [
  { id: 1, name: "Comrades Party", date: "2025-09-15" },
  { id: 2, name: "Kutus Run", date: "2025-09-20" }
];

router.get("/", (req, res) => {
  res.json(events);
});

module.exports = router;
