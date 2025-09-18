const express = require("express");
const router = express.Router();

const notices = [
  { id: 1, title: "Semester Registration", detail: "Deadline is Sept 20" },
  { id: 2, title: "Lost & Found", detail: "Black bag found near gate A" }
];

router.get("/", (req, res) => {
  res.json(notices);
});

module.exports = router;
