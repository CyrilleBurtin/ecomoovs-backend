const express = require('express')
const router = express.Router()
const newsModel = require('../models/news')

/* GET news list */
router.get('/', function(req, res) {
  newsModel.find((error, data) =>error ? res.json(error) : res.json(data))
})

/* POST add news */
router.post('/', function(req, res){
    console.log(req.file);
    let newNews = new newsModel({ 
    author: req.body.author,
    title: req.body.title,
    punchLine: req.body.punchLine,
    description: req.body.description,
    userId: req.body.userId
    });
  
    newNews.save(function(error, news){
    if (error){ res.json(error) }
    else { res.json({news}) }
  });

});


/* PUT edit news */
router.put('/', function(req, res){

  newsModel.findByIdAndUpdate(req.body._id, {
    author: req.body.author,
    title: req.body.title,
    punchLine: req.body.punchLine,
    description: req.body.description,
    userId: req.body.userId
  },{
    new: true,
    select :{
      __v: false
    }
  }, function(error, news){
    if (error) { res.json(error) }
    else { res.json(news) }
  });
});

/* DELETE news */
router.delete('/:id([0-9a-f]{24})', function(req, res){
  console.log(req.params);
  newsModel.findByIdAndDelete(req.params.id, function(error, news){
    if (error){ res.json(error) }
    else { res.json({Message : "news deleted", news}) }
  })
})

module.exports = router;
