const moovModel = require("../models/moovs");
const imageUpload = require("../middleware/imageUpload");
const controllers = {};

//* GET moov list */
controllers.moovList = (req, res) => {
  // moovModel.find({ validated: true }, (error, moovs) => {
  moovModel.find((error, moovs) => {
    error ? res.json(error) : res.json(moovs);
  });
};

//* FIND tags in moov with user request
controllers.findTags = (req, res) => {
  console.log("req.body", req.body);

  moovModel.find({ tags: { $all: req.body } }, (error, moovs) => {
    error ? res.json(error) : res.json(moovs);
  });
};

//* POST add moov */
controllers.addMoov = (req, res) => {
  // set image size and folder
  const height = 600;
  const width = 1200;
  const folder = "ecomoovs/moovs";
  let tags = req.body.tags.toLowerCase().split(",");

  //called by imageUpload function
  const setMoov = result => {
    console.log("result", result);
    let newMoov = new moovModel({
      type: req.body.type,
      name: req.body.name,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country
      },
      email: req.body.email,
      phone: req.body.phone,
      url: req.body.url,
      title: req.body.title,
      punchline: req.body.punchLine,
      description: req.body.description,
      regNumber: req.body.regNumber,
      tags: tags,
      img: result.eager[0].url,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      userId: req.body.userId,
      validated: false
    });

    newMoov.save((error, moov) => {
      error
        ? res.json({ error, fail: "faill" })
        : res.json({ registration: true, moov });
    });
  };

  // image upload function
  imageUpload(req, setMoov, width, height, folder);
};

//* PUT edit moov */
controllers.editMoov = (req, res) => {
  moovModel.findByIdAndUpdate(
    req.body._id,
    {
      type: req.body.type,
      name: req.body.name,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country
      },
      email: req.body.email,
      phone: req.body.phone,
      url: req.body.url,
      title: req.body.title,
      punchLine: req.body.punchLine,
      description: req.body.description,
      regNumber: req.body.regNumber,
      tags: req.body.tags,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter
    },
    {
      new: true,
      select: {
        __v: false
      }
    },
    (error, moov) => {
      error ? res.json(error) : res.json(moovs);
    }
  );
};

//* DELETE moov */
controllers.deleteMoov = (req, res) => {
  console.log(req.params);
  moovModel.findByIdAndDelete(req.params.id, (error, moov) => {
    error ? res.json(error) : res.json({ Message: "moov deleted", moov });
  });
};

module.exports = controllers;
