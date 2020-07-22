const moovModel = require('../models/moovs');
const imageUpload = require('../middleware/imageUpload');
const imageDelete = require('../middleware/imageDelete');
const mongoose = require('mongoose');
const controllers = {};

//* GET moov list */
controllers.moovList = (req, res) => {
  moovModel.find((error, moovs) => {
    moovs ? res.json(moovs) : res.json(error);
  });
};

//* GET MyMoovsList */
controllers.myMoovs = (req, res) => {
  var id = mongoose.Types.ObjectId(req.params.id);
  moovModel.find({ userId: id }, (error, moovs) => {
    error ? res.json(error) : res.json(moovs);
  });
};

//* FIND in moovs with user request
controllers.findMoovs = (req, res) => {
  let request = {};

  if (req.body.what.length > 0) {
    request.$or = [
      { tags: { $in: req.body.what } },
      { name: { $in: req.body.what } },
      { title: { $in: req.body.what } },
      { description: { $in: req.body.what } },
    ];
  }

  if (req.body.where.length > 0) {
    request.$and = [{ 'location.city': req.body.where }];
  }

  moovModel
    .find({ ...request })
    .collation({ locale: 'fr', strength: 1 })
    .then((moovs) => res.json(moovs))
    .catch((error) => console.log(error));
};

//* POST add moov */
controllers.addMoov = (req, res) => {
  // set image size and folder
  const height = 600;
  const width = 1200;
  const folder = 'ecomoovs/moovs';
  let tags = req.body.tags.toLowerCase().split(',');

  //called by imageUpload function
  const setMoov = (result) => {
    let newMoov = new moovModel({
      type: req.body.type,
      name: req.body.name,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country,
      },
      email: req.body.email,
      phone: req.body.phone,
      url: req.body.url,
      title: req.body.title,
      punchline: req.body.punchline,
      description: req.body.description,
      regNumber: req.body.regNumber,
      tags: tags,
      img: result,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      userId: req.body.userId,
      validated: false,
    });

    newMoov.save((error, moov) => {
      error
        ? res.json({ error, fail: 'fail' })
        : res.json({ registration: true, moov });
    });
  };

  // image upload function
  imageUpload(req, setMoov, width, height, folder);
};

//* import moovs from csv */

controllers.importCsv = (req, res) => {
  let dataObject = [];
  for (let i = 1; i < req.body.length; i++) {
    let tempObject = {};
    let tempLocation = {};
    for (let j = 0; j <= req.body[0].length; j++) {
      tempObject = { ...tempObject, [req.body[0][j]]: req.body[i][j] };

      if (req.body[0][j] === 'tags') {
        tempsObject = {
          ...tempObject,
          [req.body[0][j]]: req.body[i][j].toLowerCase().split(' '),
        };
      }

      if (
        req.body[0][j] === 'city' ||
        req.body[0][j] === 'address' ||
        req.body[0][j] === 'zipcode' ||
        req.body[0][j] === 'country'
      ) {
        tempLocation = {
          ...tempLocation,
          [req.body[0][j]]: req.body[i][j],
        };
      }
    }

    tempObject = {
      ...tempsObject,
      location: tempLocation,
      img: {
        eager: [
          {
            secure_url:
              'https://res.cloudinary.com/burt/image/upload/v1592298897/ecomoovs/moovs/i8kautrnt1x3jaxekt8w.jpg',
          },
        ],
      },
    };

    dataObject.push(tempObject);
  }
  //   try {
  //     let newMoov = new moovModel({
  //     type: dataObject.name,
  //     name: dataObject.name,
  //     location: {
  //       address: dataObject.address,
  //       zipcode: dataObject.zipcode,
  //       city: dataObject.city,
  //       country: dataObject.country,
  //     },
  //     email: dataObject.email,
  //     phone: dataObject.phone,
  //     url: dataObject.url,
  //     title: dataObject.title,
  //     punchline: dataObject.punchline,
  //     description: dataObject.description,
  //     regNumber: dataObject.regNumber,
  //     tags: dataObject.tags,
  //     img: dataObject.img,
  //     facebook: dataObject.facebook,
  //     instagram: dataObject.instagram,
  //     twitter: dataObject.twitter,
  //     userId: dataObject.userId,
  //     validated: false,
  //   });
  //   return newMoov
  // } catch (error) {
  //   console.log('error', error)
  // }

  console.log('dataObject', dataObject)

    const newMoov = mongoose.model(
    'moov',
    new mongoose.Schema({
      creationDate: {
        type: Date,
        default: Date.now,
      },
      type: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      location: {
        city: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        zipcode: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
      },
      email: String,
      phone: String,
      url: String,
      title: {
        type: String,
        required: true,
      },
      punchline: String,
      description: {
        type: String,
        required: true,
      },
      regNumber: String,
      tags: {
        type: Array,
      },
      facebook: String,
      instagram: String,
      twitter: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
      },
      img: Object,
      validated: Boolean,
    })
  );

  try {
    newMoov.insertMany(dataObject);
    res.json({ registration: true });
  } catch (error) {
    console.log('error', error);
  }

};

//* PUT edit moov */
controllers.editMoov = (req, res) => {
  let tags = req.body.tags.toLowerCase().split(',');
  let searchTags = req.body.searchTags.toLowerCase().split(',');
  moovModel.findByIdAndUpdate(
    req.body._id,
    {
      type: req.body.type,
      name: req.body.name,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country,
      },
      email: req.body.email,
      phone: req.body.phone,
      url: req.body.url,
      title: req.body.title,
      punchline: req.body.punchline,
      description: req.body.description,
      regNumber: req.body.regNumber,
      tags: tags,
      searchTags: searchTags,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      twitter: req.body.twitter,
      userId: req.body.userId,
      validated: req.body.validated,
      image: undefined,
    },
    {
      new: true,
      select: {
        __v: false,
      },
    },
    (error, moov) => {
      error ? res.json(error) : res.json(moov);
    }
  );
};

//* DELETE moov */
controllers.deleteMoov = (req, res) => {
  imageDelete(`ecomoovs/moovs/${req.params.img}`);

  moovModel.findByIdAndDelete(req.params.id, (error, moov) => {
    error ? res.json(error) : res.json({ Message: 'moov deleted', moov });
  });
};

module.exports = controllers;
