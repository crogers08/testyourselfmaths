const express = require('express');
const router = express.Router();
const divideController = require('../controllers/divideController');

// GET /divide
router.get("/", divideController.getDividePage);

// POST /divide/check-answer
router.post("/check-answer", divideController.checkAnswer);


module.exports = router;