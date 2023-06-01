const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.json({
    message: "get!",
  });
});

router.post('/', function (req, res, next) {
  res.json({
    message: "post!",
  });
});

module.exports = router;
