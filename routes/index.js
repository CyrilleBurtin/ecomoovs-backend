var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('index route')
  res.render('index', { title: 'Ecomoovs' });
});

module.exports = router;
