// GET /index
const calculationUtility = require('../utils/calculationUtility');

exports.getIndexPage = async (req, res) => {
    // Reset session variables
    calculationUtility.resetSession(req);   

    const pageTitle = "Test Your Skills";
    res.render("index", { pageTitle });
}