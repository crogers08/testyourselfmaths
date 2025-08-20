// GET /divide
exports.getDividePage = async (req, res) => {

    const titleofpage = "Division";

    // Initialize session variables if not present
    if (!req.session.divQuestionNumber) req.session.divQuestionNumber = 1;
    if (!req.session.divCorrectNumber) req.session.divCorrectNumber = 0;
    
        let num1 = parseInt(req.query.num1, 10);
        let num2 = parseInt(req.query.num2, 10);
        let product = num1 * num2;
        
        //If not provided, generate new numbers
        if(isNaN(num1) || isNaN(num2) || isNaN(product)){
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;
            product = num1 * num2;
    
        }
     // Retrieve the validation message from the query parameter, if it exists
     const message = req.query.message || null;
     const answer = req.query.answer ? parseInt(req.query.answer, 10) : null;
    const correctNumber = req.session.divCorrectNumber;
    const totalQuestions = 12;
    
    // If Next button was clicked (message exists and not finished), increment questionNumber
    console.log('Session:', req.session); // Add this line
    if (req.query.next === 'true') {
        req.session.divQuestionNumber += 1;
        console.log(`Next question: ${req.session.divQuestionNumber}`);
    }
    const questionNumber = req.session.divQuestionNumber;
    
    // If finished, show results and reset
    if (questionNumber > totalQuestions) {
        const finalMessage = `You got ${correctNumber} out of ${totalQuestions} correct! Starting over...`;
        // Reset session for new round
        req.session.divQuestionNumber = 1;
        req.session.divCorrectNumber = 0;
        return res.render("divide", {
            pale: titleofpage,
            num1: null,
            num2: null,
            product: null,
            message: finalMessage,
            answer: null,
            correctAnswer: null,
            questionNumber: totalQuestions,
            correctNumber: correctNumber,
            totalQuestions
        });
    }
    
    console.log(`Next questionNumvar: ${questionNumber}`);
    res.render("divide", {
        pale: titleofpage,
        num1,
        num2,
        product,
        message,
        answer,
        correctAnswer: answer === num1 ? 1 : 0,
        questionNumber,
        correctNumber,
        totalQuestions
    });
};

// POST /divide/check-answer
exports.checkAnswer = (req, res) => {    
    const userAnswer = parseInt(req.body.answer, 10);
    const num1 = parseInt(req.body.num1, 10);
    const num2 = parseInt(req.body.num2, 10);
    const product = num1 * num2;
     let message;
    let correctAnswer = 0;

    if (userAnswer === num1) {
        message = "Correct! Well done.";
        correctAnswer = 1;
        req.session.divCorrectNumber = (req.session.divCorrectNumber || 0) + 1;
    } else {
        message = `Incorrect. The correct answer is ${num1}.`;
    }

    
    res.redirect(`/divide?num1=${num1}&num2=${num2}&answer=${userAnswer}&product=${product}&message=${encodeURIComponent(message)}&correctAnswer=${correctAnswer}`);
};
