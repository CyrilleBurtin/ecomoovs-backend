const moovModel = require("../models/moovs");
// const cloudinary = require("cloudinary");

const controllers = {};

//* GET moov list */
controllers.moovList = (req, res) => {
  moovModel.find({ validated: true }, (error, moovs) => {
    error ? res.json(error) : res.json(moovs);
  });
};

//* Upload photo */

controllers.addPhoto = (req, res) => {
  console.log("photo add", req.files);
};

//* POST add moov */
controllers.addMoov = (req, res) => {
  let newMoov = new moovModel({
    type: req.body.moov.type,
    name: req.body.moov.name,
    location: {
      address: req.body.moov.address,
      zipcode: req.body.moov.zipcode,
      city: req.body.moov.city,
      country: req.body.moov.country
    },
    email: req.body.moov.email,
    phone: req.body.moov.phone,
    url: req.body.moov.url,
    title: req.body.moov.title,
    punchLine: req.body.moov.punchLine,
    description: req.body.moov.description,
    regNumber: req.body.moov.regNumber,
    tags: req.body.moov.tags,
    facebook: req.body.moov.facebook,
    instagram: req.body.moov.instagram,
    twitter: req.body.moov.twitter,
    userId: req.body.moov.userId,
    validated: false
  });

  newMoov.save((error, moov) => {
    error
      ? res.json({ error, fail: "faill" })
      : res.json({ registration: true, moov });
  });
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
