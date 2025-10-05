const express = require('express');
const { createDesign } = require('../controllers/designController');

const router = express.Router();

router.post('/designs', createDesign);
 


module.exports = router;