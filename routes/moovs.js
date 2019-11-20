const express = require('express');
const router = express.Router();
const moovModel = require('../models/moovs');
const cloudinary = require('cloudinary');
/* GET moov list */
router.get('/', function(req, res) {
  moovModel.find(function(error, moovs){
    if (error) {res.json(error)}
    else {res.json(moovs)}
  });
});


/* Upload photo */

router.post('/photo', function(req, res){
  console.log('photo add', req.files)
  

});


/* POST add moov */
router.post('/', function(req, res){
   let newMoov = new moovModel({
    type : req.body.moov.type,
    name : req.body.moov.name,
    location: {
      address : req.body.moov.address,
      zipcode : req.body.moov.zipcode,
      city : req.body.moov.city,
      country : req.body.moov.country
    },
    email : req.body.moov.email,
    phone : req.body.moov.phone,
    url : req.body.moov.url,
    title : req.body.moov.title,
    punchLine : req.body.moov.punchLine,
    description : req.body.moov.description,
    regNumber : req.body.moov.regNumber,
    tags : req.body.moov.tags,
    facebook : req.body.moov.facebook,
    instagram : req.body.moov.instagram,
    twitter : req.body.moov.twitter,
    userId : req.body.moov.userId,
    validated : false
  });

  newMoov.save(function(error, moov){
    if (error){ res.json({error, fail:'faill'}) }
    else { res.json({registration: true, moov}) }
  });

});

/* PUT edit moov */
router.put('/', function(req, res){

  moovModel.findByIdAndUpdate(req.body._id, {
    type : req.body.type,
    name : req.body.name,
    location: {
      address : req.body.address,
      zipcode : req.body.zipcode,
      city : req.body.city,
      country : req.body.country
    },
    email : req.body.email,
    phone : req.body.phone,
    url : req.body.url,
    title : req.body.title,
    punchLine : req.body.punchLine,
    description : req.body.description,
    regNumber : req.body.regNumber,
    tags : req.body.tags,
    facebook : req.body.facebook,
    instagram : req.body.instagram,
    twitter : req.body.twitter,
  },{
    new: true,
    select :{
      __v: false
    }
  }, function(error, moov){
    if (error) { res.json(error) }
    else { res.json(moov) }
  });
});

/* DELETE moov */
router.delete('/:id([0-9a-f]{24})', function(req, res){
  console.log(req.params);
  moovModel.findByIdAndDelete(req.params.id, function(error, moov){
    if (error){ res.json(error) }
    else { res.json({Message : "moov deleted", moov}) }
  })
})

module.exports = router;
