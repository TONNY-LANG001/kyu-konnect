const express = require("express");
const router = express.Router();

const items = [
  { id: 1, seller: "Aisha", item: "Thrift Jackets", price: 350 },
  { id: 2, seller: "Brian", item: "Laptop", price: 20000 }
];

router.get("/", (req, res) => {
  res.json(items);
});

module.exports = router;
