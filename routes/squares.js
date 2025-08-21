const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// GET /squares
router.get("/", (req,res) => pageController.getPage(req, res, 'squares', 'Squared Numbers'));

// POST /squares/check-answer
router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'squares', 'Squared Numbers'));

module.exports = router;
