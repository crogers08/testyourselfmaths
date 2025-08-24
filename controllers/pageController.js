const calculationUtility = require('../utils/calculationUtility');
const numberOfQuestions = 12;
const quizPage = 'quizPage'; // The name of the EJS template to render
// GET /page
exports.getQuizPage = async (req, res, pageName, pageTitle) => {
    //use the numbers from the query parameters to display the question after answer has been submitted
    let num1 = parseInt(req.query.num1, 10);
    let num2 = parseInt(req.query.num2, 10);
    
    // If num1 or num2 doesnt yet exist, generate new numbers
    if (isNaN(num1) || isNaN(num2)) {
         // Pick a unique num1 not used before
        num1 = calculationUtility.getUniqueNum1(req);
        if(pageName !== 'squares') {
            // For squares, num2 is the same as num1
        num2 = calculationUtility.getRandomInt(1, 12);    
        } else {
            num2 = num1; // For squares, num2 is the same as num1
        }
    }

    const product = num1 * num2; //used for division questions
    const message = req.query.message || null;
    const answer = req.query.answer ? parseInt(req.query.answer, 10) : null;
    const correctNumber = req.session.correctNumber;
    const totalQuestions = numberOfQuestions;
    const questionText = calculationUtility.getQuestionText(num1, num2, product, pageTitle);

    // If Next button was clicked increment questionNumber
    if (req.query.next === 'true') {
        req.session.questionNumber += 1;
    }
    //  Get the current question number from the session
    const questionNumber = req.session.questionNumber;
    // If question number limit has been reached the quiz has ended, reset session and re-render the page to show results
    if (questionNumber > totalQuestions) {
        const finalMessage = `You got ${correctNumber} out of ${totalQuestions} correct! `;
        calculationUtility.resetSession(req); 

        return res.render(quizPage, {
            pageName,
            pageTitle,
            num1: null,
            num2: null,
            product: null,
            message: finalMessage,
            answer: null,
            correctAnswer: null,
            questionNumber: totalQuestions,
            correctNumber,
            totalQuestions,
            questionText,
        });
    }
    // Calculate the correct answer based on the calculation type and assign boolean value to correctAnswer  
    const correctAnswer = answer === calculationUtility.calculateCorrectAnswer(num1, num2, pageTitle) ? 1 : 0;
    
    // Render the page with the current question and session data
    res.render(quizPage, {
        pageName,
        pageTitle,
        num1,
        num2,
        product,
        message,
        answer,
        correctAnswer,
        questionNumber,
        correctNumber,
        totalQuestions,
        questionText,
    });
};

// POST /page/check-answer
exports.checkAnswer = async (req, res, quizPage, pageTitle) => {
    console.log(`userAnswer`, req.body);
    const userAnswer = parseInt(req.body.answer, 10);
    const num1 = parseInt(req.body.num1, 10);
    const num2 = parseInt(req.body.num2, 10); // For squares, num2 is the same as num1

    const calculatedAnswer = calculationUtility.calculateCorrectAnswer(num1, num2, pageTitle);
    const isAnswerCorrect = userAnswer === calculatedAnswer ? 1 : 0;
    const message = calculationUtility.getResponseMessage(req, res, isAnswerCorrect, calculatedAnswer);
    console.log(`/${quizPage}?num1=${num1}&num2=${num2}&answer=${userAnswer}&product=${calculatedAnswer}&message=${encodeURIComponent(message)}&correctAnswer=${isAnswerCorrect}`);
    res.redirect(`/${quizPage}?num1=${num1}&num2=${num2}&answer=${userAnswer}&product=${calculatedAnswer}&message=${encodeURIComponent(message)}&correctAnswer=${isAnswerCorrect}`);
};
