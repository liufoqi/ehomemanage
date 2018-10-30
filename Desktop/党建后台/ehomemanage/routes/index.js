var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/user',require('../controller/adminUser'))
router.use('/article',require('../controller/article'))
router.use('/article/category',require('../controller/category'))
module.exports = router;
