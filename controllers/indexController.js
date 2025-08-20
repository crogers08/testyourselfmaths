// GET /index
exports.getIndexPage = async (req, res) => {
    // Reset session variables
    req.session.questionNumber = 1;
    req.session.correctNumber = 0;

    const pageTitle = "Test Your Skills";
    res.render("index", { pageTitle });
}