const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
require('dotenv').config();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//change view engine from default to ejs
app.set('view engine', 'ejs');

//serve the static files saved in public directory
app.use(express.static(path.join(__dirname,'./public')));

//use express-session for session management
// This middleware will allow us to store session data
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}));

//fetch routes
//index
app.get("/",async(req, res)=>{
    // Reset session variables
    // This will reset the question number and correct answer count
    req.session.questionNumber = 1;
    req.session.correctNumber = 0;

    const titleofpage = "Index";
    res.render("index",{pageTitle : titleofpage});
});
//multiplication
app.get("/multiply",async(req, res)=>{
    const titleofpage = "Multiplication";

    // Initialize session variables if not present
    if (!req.session.questionNumber) req.session.questionNumber = 1;
    if (!req.session.correctNumber) req.session.correctNumber = 0;
    
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
    const correctNumber = req.session.correctNumber;
    const totalQuestions = 12;
    
    // If Next button was clicked (message exists and not finished), increment questionNumber
    console.log('Session:', req.session); // Add this line
    if (req.query.next === 'true') {
        req.session.questionNumber += 1;
        console.log(`Next question: ${req.session.questionNumber}`);
    }
    const questionNumber = req.session.questionNumber;
    
    // If finished, show results and reset
    if (questionNumber > totalQuestions) {
        const finalMessage = `You got ${correctNumber} out of ${totalQuestions} correct! Starting over...`;
        // Reset session for new round
        req.session.questionNumber = 1;
        req.session.correctNumber = 0;
        return res.render("multiply", {
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
    res.render("multiply", {
        pale: titleofpage,
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
});

// Check Answer
app.post("/check-answer", (req, res) => {
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
});

//division
app.get("/divide",async(req, res)=>{
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
});

// Check Answer
app.post("/check-div-answer", (req, res) => {
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
});


// Add error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//start the server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on localhost port: ${process.env.APP_PORT}`);

});

