const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const controllers = {};

//* GET users listing AUTH
controllers.usersList = (req, res) => {
  userModel.find((error, users) => {
    error ? res.json(error) : res.json(users);
  });
};

//* Login
controllers.login = async (req, res) => {
  // get user with email if exist
  const user = await userModel.findOne({ email: req.body.email });
  !user ? res.status(400).send('email ou mot de passe non valide') : null;

  // passvord check
  const validePass = await bcrypt.compare(req.body.password, user.password);
  !validePass ? res.status(400).send('email ou mot de passe non valide') : null;
  //building token with user info
  try {
    let token = jwt.sign(
      {
        user: {
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          location: {
            address: user.location.address,
            zipcode: user.location.zipcode,
            city: user.location.city,
            country: user.location.country
          },
          admin: true,
          validated: user.validated,
          active: user.active
          // admin: user.admin,
        }
      },
      process.env.SECRET_TOKEN,
      { expiresIn: '2h' }
    );
    res.json(token);
    console.log('token', token);
  } catch (error) {
    res.json(error);
    console.log('error', error);
  }
};

//* POST add new users
controllers.addUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new userModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    location: {
      address: req.body.address,
      zipcode: req.body.zipcode,
      city: req.body.city,
      country: req.body.country
    },
    validated: false,
    active: true
  });

  newUser.save((error, user) => {
    if (error && error.code == 11000) {
      res.json({ registration: false, error: 'user already exist' });
    } else if (error) {
      res.json({ registration: false, message: error.message });
    } else if (user) {
      let token = jwt.sign(
        {
          user: {
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            phone: user.phone,
            location: {
              address: user.location.address,
              zipcode: user.location.zipcode,
              city: user.location.city,
              country: user.location.country
            },
            admin: user.admin,
            validated: user.validated,
            active: user.active
          }
        },
        process.env.SECRET_TOKEN,
        { expiresIn: '2h' }
      );
      res.json({ registration: true, token: token });
    } else {
      res.json({ registration: false });
    }
  });
};

//* UPDATE edit user
controllers.editUser = (req, res) => {
  userModel.findByIdAndUpdate(
    req.params.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      location: {
        address: req.body.address,
        zipcode: req.body.zipcode,
        city: req.body.city,
        country: req.body.country
      }
    },
    {
      new: true,
      select: {
        password: false,
        __v: false
      }
    },
    (error, user) => {
      let token = jwt.sign({ user: user }, process.env.SECRET_TOKEN, {
        expiresIn: '2h'
      });
      error ? res.json(error) : res.json(token);
    }
  );
};

//* UPDATE edit password
controllers.password = async (req, res) => {
  // get user with email if exist
  const user = await userModel.findOne({ _id: req.body.id });
  !user ? res.status(400).send('Une nerreur est surnvenue') : null;

  // passvord check
  const validePass = await bcrypt.compare(
    req.body.password.currentPassword,
    user.password
  );

  const hashedPassword = await bcrypt.hash(req.body.password.newPassword, 10);
  if (!validePass) {
    res.status(400).send('Mot de passe actuel incorrect');
  } else {
    userModel.findByIdAndUpdate(
      req.body.id,
      {
        password: hashedPassword
      },
      {
        new: true,
        select: {
          password: false,
          token: false,
          __v: false
        }
      },
      (error, update) => {
        error ? res.json(error) : res.json(update);
      }
    );
  }
};

//* DELETE delete users AUTH
controllers.deleteUser = (req, res) => {
  userModel.findByIdAndDelete(req.params.id, (error, user) => {
    error ? res.json(error) : res.json({ message: 'ok', user });
  });
};

module.exports = controllers;
