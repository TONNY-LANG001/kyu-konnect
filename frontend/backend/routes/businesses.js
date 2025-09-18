const express = require("express");
const router = express.Router();

const businesses = [
  { id: 1, name: "Joy's Kinyozi", type: "Kinyozi", promo: "Free haircut for freshers!" },
  { id: 2, name: "Cyber Kutus", type: "Cybercafe", promo: "Printing @ 5/- per page" }
];

router.get("/", (req, res) => {
  res.json(businesses);
});

module.exports = router;
