const { get } = require("../routes");

function getRandomInt (min, max) {
    // Ensure min and max are integers
    min = Math.ceil(min);   
    max = Math.floor(max);
    // Ensure the random number is within the specified range
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getResponseMessage (req, res, isAnswerCorrect,calculatedAnswer){
    
    let message;

    if (isAnswerCorrect) {
        message = "Correct! Well done.";
        req.session.correctNumber = (req.session.correctNumber || 0) + 1;
    } else {
        message = `Incorrect. The correct answer is ${calculatedAnswer}.`;
    }   
    return message;
}     

function getUniqueNum1 (req, min, max){
    console.log('getUniqueNum1 min,max:', min, max);
    if (!req.session.usedNums) {
        req.session.usedNums = [];
    }
     const availableNums = Array.from({ length: max }, (_, i) => i + 1)
            .filter(n => !req.session.usedNums.includes(n));

        // If we've run out, reset (safety net)
        if (availableNums.length === 0) {
            req.session.usedNums = [];
            num1 = getRandomInt(min, max);
        } else {
            num1 = availableNums[getRandomInt(0, availableNums.length-1)];
        }

        // Add chosen num1 to session tracker
        req.session.usedNums.push(num1);
        console.log('usedNums:', req.session.usedNums);
        console.log('num1 getUniqueNum1:', num1);
        return num1;
}

function resetSession (req, res) {
    req.session.questionNumber = 1;
    req.session.correctNumber = 0;
    req.session.usedNums = [];  
}

function getOrdinal(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function getQuestionText (num1, num2, product, calculationType){
    let questionText = "";
    switch (calculationType) {
        case 'Multiplication':
            questionText = `${num1} x ${num2}`;
            break;
        case 'Division':
            questionText = `${product} &divide; ${num1}`;
            break;
        case 'Squared Numbers':
            questionText = `${num1}&sup2;`;
            break;
        case 'Cubed Numbers':
            questionText = `${num1}&sup3;`;
            break;
        case 'Triangular Numbers':
            questionText = `${getOrdinal(num1)} triangular number`;
            break;
        default:
            throw new Error('Invalid calculation type');
    }
    return questionText+= " = ";
}
function calculateCorrectAnswer (num1, num2, calculationType) {
    console.log('calculateCorrectAnswer', num1, num2, calculationType);
    let correctAnswer = 0;
    switch (calculationType) {
        case 'Multiplication':
            correctAnswer = num1 * num2;
            break;
        case 'Division':
            correctAnswer = num2;
            break;
        case 'Squared Numbers':
            correctAnswer = Math.pow(num1, 2);
            break;
        case 'Cubed Numbers':
            correctAnswer = Math.pow(num1, 3);
            break;
        case 'Triangular Numbers':
            correctAnswer = (num1 * (num1 + 1)) / 2;
            break;
        default:
            throw new Error('Invalid calculation type');
    }
    return correctAnswer;
}

module.exports = {
    getRandomInt,
    calculateCorrectAnswer,
    getQuestionText,
    resetSession,
    getUniqueNum1,
    getResponseMessage,
};