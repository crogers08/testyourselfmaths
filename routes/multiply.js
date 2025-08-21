const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// GET /multiply
router.get("/", (req,res) => pageController.getPage(req, res, 'multiply', 'Multiplication'));

// POST /multiply/check-answer
router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'multiply', 'Multiplication'));
module.exports = router;
