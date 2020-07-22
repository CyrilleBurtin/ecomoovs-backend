const express = require('express');
const router = express.Router();
const authCheck = require('../libs/auth');
const adminCheck = require('../libs/adminCheck');
const controllers = require('../controllers/moovs-controller');

/* GET moov list */
router.get('/', controllers.moovList);

router.get('/myMoovs/:id([0-9a-f]{24})', controllers.myMoovs);


/* POST import csv */
router.post('/importCsv', controllers.importCsv);

//! check user Token for next routes
router.use(authCheck);

/* POST add moov */
router.post('/', controllers.addMoov);


/* PUT edit moov */
router.put('/', controllers.editMoov);

/* DELETE moov */
router.delete('/:id([0-9a-f]{24})/ecomoovs/moovs/:img', controllers.deleteMoov);

router.use(adminCheck)

router.post('/findMoovs', controllers.findMoovs);

module.exports = router;
