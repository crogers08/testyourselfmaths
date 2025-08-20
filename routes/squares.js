const express = require('express');
const router = express.Router();
const squaresController = require('../controllers/squaresController');

// GET /squares
router.get("/", squaresController.getSquaresPage);

// POST /squares/check-answer
router.post("/check-answer", squaresController.checkAnswer);
module.exports = router;
