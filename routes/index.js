const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// GET /index
router.get("/", indexController.getIndexPage);

module.exports = router;