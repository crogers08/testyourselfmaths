const express = require("express");
const app = express();
const session = require('express-session');
const path = require("path");
require('dotenv').config();


const indexRoutes = require('./routes/index');
const quizRoutes = require('./routes/quizRoutes');
// const multiplyRoutes = require('./routes/multiply');
// const divideRoutes = require('./routes/divide');
// const squaresRoutes = require('./routes/squares');
// const cubesRoutes = require('./routes/cubes');



// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//change view engine from default to ejs
app.set('view engine', 'ejs');

//serve the static files saved in public directory
app.use(express.static(path.join(__dirname,'./public')));


// This middleware will allow us to store session data
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: true
}));

// Routes
app.use('/', indexRoutes);
app.use('/', quizRoutes);
// app.use('/multiply', multiplyRoutes);
// app.use('/divide', divideRoutes);
// app.use('/squares', squaresRoutes);
// app.use('/cubes', cubesRoutes);

// Add error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

//start the server
app.listen(process.env.APP_PORT, () => {
    console.log(`Server is listening on localhost port: ${process.env.APP_PORT}`);

});

