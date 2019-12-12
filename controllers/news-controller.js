const newsModel = require("../models/news");

const controllers = {};

//* GET news list */
controllers.newsList = (req, res) => {
  newsModel.find((error, data) => (error ? res.json(error) : res.json(data)));
};

//* POST add news */
controllers.addNews = (req, res) => {
  console.log(req.file);
  let newNews = new newsModel({
    author: req.body.author,
    title: req.body.title,
    punchLine: req.body.punchLine,
    description: req.body.description,
    userId: req.body.userId
  });

  newNews.save((error, news) => {
    error ? res.json(error) : res.json({ news });
  });
};

//* PUT edit news */
controllers.editNews = (req, res) => {
  newsModel.findByIdAndUpdate(
    req.body._id,
    {
      author: req.body.author,
      title: req.body.title,
      punchLine: req.body.punchLine,
      description: req.body.description,
      userId: req.body.userId
    },
    {
      new: true,
      select: {
        __v: false
      }
    },
    (error, news) => {
      error ? res.json(error) : res.json({ news });
    }
  );
};

//* DELETE news */
controllers.deleteNews = (req, res) => {
  console.log(req.params);
  newsModel.findByIdAndDelete(req.params.id, (error, news) => {
    error ? res.json(error) : res.json({ Message: "news deleted", news });
  });
};

module.exports = controllers;
