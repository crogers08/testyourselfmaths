// GET /multiply
exports.getMultiplyPage = async (req, res) => {
    const pageTitle = "Multiplication";

    if (!req.session.questionNumber) req.session.questionNumber = 1;
    if (!req.session.correctNumber) req.session.correctNumber = 0;
    
    let num1 = parseInt(req.query.num1, 10);
    let num2 = parseInt(req.query.num2, 10);
    let product = num1 * num2;
    
    if (isNaN(num1) || isNaN(num2) || isNaN(product)) {
        num1 = Math.floor(Math.random() * 12) + 1;
        num2 = Math.floor(Math.random() * 12) + 1;
        product = num1 * num2;
    }

    const message = req.query.message || null;
    const answer = req.query.answer ? parseInt(req.query.answer, 10) : null;
    const correctNumber = req.session.correctNumber;
    const totalQuestions = 12;

    if (req.query.next === 'true') {
        req.session.questionNumber += 1;
    }
    const questionNumber = req.session.questionNumber;

    if (questionNumber > totalQuestions) {
        const finalMessage = `You got ${correctNumber} out of ${totalQuestions} correct! Starting over...`;
        req.session.questionNumber = 1;
        req.session.correctNumber = 0;

        return res.render("multiply", {
            pageTitle,
            num1: null,
            num2: null,
            product: null,
            message: finalMessage,
            answer: null,
            correctAnswer: null,
            questionNumber: totalQuestions,
            correctNumber,
            totalQuestions
        });
    }

    res.render("multiply", {
        pageTitle,
        num1,
        num2,
        product,
        message,
        answer,
        correctAnswer: answer === product ? 1 : 0,
        questionNumber,
        correctNumber,
        totalQuestions
    });
};

// POST /multiply/check-answer
exports.checkAnswer = (req, res) => {
    const userAnswer = parseInt(req.body.answer, 10);
    const num1 = parseInt(req.body.num1, 10);
    const num2 = parseInt(req.body.num2, 10);
    const product = num1 * num2;

    let message;
    let correctAnswer = 0;

    if (userAnswer === product) {
        message = "Correct! Well done.";
        correctAnswer = 1;
        req.session.correctNumber = (req.session.correctNumber || 0) + 1;
    } else {
        message = `Incorrect. The correct answer is ${product}.`;
    }

    res.redirect(`/multiply?num1=${num1}&num2=${num2}&answer=${userAnswer}&product=${product}&message=${encodeURIComponent(message)}&correctAnswer=${correctAnswer}`);
};
