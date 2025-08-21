const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// GET /divide
router.get("/", (req,res) => pageController.getPage(req, res, 'divide', 'Division'));

// POST /divide/check-answer
router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'divide', 'Division'));

module.exports = router;