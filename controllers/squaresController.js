// GET /squares
exports.getSquaresPage = async (req, res) => {
    const pageTitle = "Squared Numbers";

    if (!req.session.questionNumber) req.session.questionNumber = 1;
    if (!req.session.correctNumber) req.session.correctNumber = 0;
    if (!req.session.usedNums) req.session.usedNums = [];     
    
    let num1 = parseInt(req.query.num1, 10);
    let product = num1 * num1;
    
    if (isNaN(num1) || isNaN(product)) {
        // Pick a unique num1 not used before
        const availableNums = Array.from({ length: 12 }, (_, i) => i + 1)
            .filter(n => !req.session.usedNums.includes(n));

        // If we've run out, reset (safety net)
        if (availableNums.length === 0) {
            req.session.usedNums = [];
            num1 = Math.floor(Math.random() * 12) + 1;
        } else {
            num1 = availableNums[Math.floor(Math.random() * availableNums.length)];
        }

        // Add chosen num1 to session tracker
        req.session.usedNums.push(num1);
        // num1 = Math.floor(Math.random() * 12) + 1;
        product = num1 * num1;
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
        req.session.usedNums = [];  

        return res.render("squares", {
            pageTitle,
            num1: null,
            product: null,
            message: finalMessage,
            answer: null,
            correctAnswer: null,
            questionNumber: totalQuestions,
            correctNumber,
            totalQuestions
        });
    }

    res.render("squares", {
        pageTitle,
        num1,
        product,
        message,
        answer,
        correctAnswer: answer === product ? 1 : 0,
        questionNumber,
        correctNumber,
        totalQuestions
    });
};

// POST /squares/check-answer
exports.checkAnswer = (req, res) => {
    const userAnswer = parseInt(req.body.answer, 10);
    const num1 = parseInt(req.body.num1, 10);
    const product = num1 * num1;

    let message;
    let correctAnswer = 0;

    if (userAnswer === product) {
        message = "Correct! Well done.";
        correctAnswer = 1;
        req.session.correctNumber = (req.session.correctNumber || 0) + 1;
    } else {
        message = `Incorrect. The correct answer is ${product}.`;
    }

    res.redirect(`/squares?num1=${num1}&answer=${userAnswer}&product=${product}&message=${encodeURIComponent(message)}&correctAnswer=${correctAnswer}`);
};
