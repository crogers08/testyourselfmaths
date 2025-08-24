const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

//Map of route names to titles
const quizPages = {
  multiply: "Multiplication",
  divide: "Division",
  squares: "Squared Numbers",
  cubes: "Cubed Numbers"
};

// GET /multiply
// router.get("/", (req,res) => pageController.getPage(req, res, 'multiply', 'Multiplication'));
router.get("/:pageName", (req, res) => {
  const { pageName } = req.params;
  const pageTitle = quizPages[pageName];
  // Ensure it's a valid page
  if (!pageTitle) {
    return res.status(404).send("Page not found");
  }

  pageController.getQuizPage(req, res, pageName, quizPages[pageName]);
});

// POST /multiply/check-answer
// router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'multiply', 'Multiplication'));
router.post("/:pageName/check-answer", (req, res) => {
  const { pageName } = req.params;
  const pageTitle = quizPages[pageName];

  if (!pageTitle) {
    return res.status(404).send("Page not found");
  }

  pageController.checkAnswer(req, res, pageName, pageTitle);
});

module.exports = router;
