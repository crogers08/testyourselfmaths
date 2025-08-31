const express = require('express');
const router = express.Router();
const pageController = require('../controllers/pageController');

//Map of route names to titles
const quizPages = {
  multiply: ["Multiplication",20,1,12],
  divide: ["Division",20,1,12],
  squares: ["Squared Numbers",12,1,12],
  cubes: ["Cubed Numbers",5,1,5],
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

  pageController.getQuizPage(req, res, pageName, quizPages[pageName][0], quizPages[pageName][1], quizPages[pageName][2], quizPages[pageName][3]);
});

// POST /multiply/check-answer
// router.post("/check-answer", (req,res) => pageController.checkAnswer(req, res, 'multiply', 'Multiplication'));
router.post("/:pageName/check-answer", (req, res) => {
  const { pageName } = req.params;
  const pageTitle = quizPages[pageName][0];

  if (!pageTitle) {
    return res.status(404).send("Page not found");
  }

  pageController.checkAnswer(req, res, pageName, pageTitle);
});

module.exports = router;
