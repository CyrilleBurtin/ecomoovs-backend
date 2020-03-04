const newsModel = require("../models/news");
const imageUpload = require("../middleware/imageUpload");
const controllers = {};

//* GET news list */
controllers.newsList = (req, res) => {
  newsModel.find((error, data) => (error ? res.json(error) : res.json(data)));
};

//* POST add news */
controllers.addNews = (req, res) => {
  const height = 600;
  const width = 1200;
  const folder = "ecomoovs/news";
  let tags = req.body.tags.toLowerCase().split(",");

  const setNews = result => {
    let newNews = new newsModel({
      author: req.body.author,
      title: req.body.title,
      punchline: req.body.punchline,
      description: req.body.description,
      url: req.body.url,
      tags: tags,
      image: result.eager[0].url,
      userId: req.body.userId
    });

    newNews.save((error, news) => {
      error ? res.json(error) : res.json({ news });
    });
  };
  imageUpload(req, setNews, width, height, folder);
};

//* PUT edit news */
controllers.editNews = (req, res) => {
  newsModel.findByIdAndUpdate(
    req.body._id,
    {
      author: req.body.author,
      title: req.body.title,
      punchline: req.body.punchline,
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
  newsModel.findByIdAndDelete(req.params.id, (error, news) => {
    error ? res.json(error) : res.json({ Message: "news deleted", news });
  });
};

module.exports = controllers;
