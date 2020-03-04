const eventModel = require("../models/event");

const controllers = {};

//* GET event list */
controllers.eventList = (req, res) => {
   eventModel.find((error, data) => (error ? res.json(error) : res.json(data)));
};

//* POST add event */
controllers.addevent = (req, res) => {
  let newevent = new eventModel({
    userId: req.body.userId,
    name: req.body.name,
    punchline: req.body.punchline,
    dateIn: req.body.dateIn,
    dateOut: req.body.dateOut,
    description: req.body.description,
    email: req.body.email,
    phone: req.body.phone,
    zipcode: req.body.zipcode,
    city: req.body.city,
    country: req.body.country
  });

  newevent.save((error, event) => {
    error ? res.json(error) : res.json({ event });
  });
};

//* PUT edit event */
controllers.editevent = (req, res) => {
  eventModel.findByIdAndUpdate(
    req.body._id,
    {
      userId: req.body.userId,
      name: req.body.name,
      punchline: req.body.punchline,
      dateIn: req.body.dateIn,
      dateOut: req.body.dateOut,
      description: req.body.description,
      email: req.body.email,
      phone: req.body.phone,
      zipcode: req.body.zipcode,
      city: req.body.city,
      country: req.body.country
    },
    {
      new: true,
      select: {
        __v: false
      }
    },
    (error, event) => {
      error ? res.json(error) : res.json({ event });
    }
  );
};

//* DELETE event */
controllers.deleteevent = (req, res) => {
  eventModel.findByIdAndDelete(req.params.id, (error, event) => {
    error ? res.json(error) : res.json({ Message: "event deleted", event });
  });
};

module.exports = controllers;
