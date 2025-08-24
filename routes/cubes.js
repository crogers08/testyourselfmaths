const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

// GET /cubes
router.get("/", (req,res) => pageController.getPage(req, res, 'cubes', 'Cubed Numbers'));

// POST /cubes/check-answer
router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'cubes', 'Cubed Numbers'));

module.exports = router;
