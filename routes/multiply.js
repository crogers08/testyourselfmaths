const express = require('express');
const router = express.Router();
const multiplyController = require('../controllers/multiplyController');

// GET /multiply
router.get("/", multiplyController.getMultiplyPage);

// POST /multiply/check-answer
router.post("/check-answer", multiplyController.checkAnswer);
module.exports = router;
