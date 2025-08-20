// GET /index
exports.getIndexPage = async (req, res) => {
    // Reset session variables
    req.session.questionNumber = 1;
    req.session.correctNumber = 0;

    const titleofpage = "Index";
    res.render("index", { pageTitle: titleofpage });
}