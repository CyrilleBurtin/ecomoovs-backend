const router = require('express').Router();
const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyJWTToken = require('../libs/auth')

//* GET users listing AUTH
router.get('/', (req, res) => {
  
  userModel.find(function (error, users) {
    if (error) { res.json(error) }
    else { res.json(users) }
  });

});
// router.get('/:token', (req, res) => {
//   if (verifyJWTToken(req.params.token)) {
//   userModel.find(function (error, users) {
//     if (error) { res.json(error) }
//     else { res.json(users) }
//   });
// }
// });





//* Login
router.post('/login', async (req, res) => {

  // get user with email if exist
  const user = await userModel.findOne({ email: req.body.email });
  !user ? res.status(400).send('email ou mot de passe non valide') : null;

  // passvord check
  const validePass = await bcrypt.compare(req.body.password, user.password)
  !validePass ? res.status(400 ).send(('email ou mot de passe non valide')) : null;

  //building token with user info
  const token = jwt.sign({
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
  }, process.env.SECRET_TOKEN, { expiresIn: '2h' });

  try{
    res.json(token)
    console.log('token', token)
  }
  
  catch(error){
    console.log('error', error)
  }
});



//* POST add new users
router.post('/', async (req, res) => {
  console.log('req.body', req.body)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  let newUser = new userModel({
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
      res.json({ registration: false, error: "user already exist" })
    } else if (error) {
      res.json({ registration: false, message: error.message })
    } else if (user) {
      let usr = user.toObject({ minimize: true, versionKey: false, hide: 'password insert_date', transform: true });
      res.json({ registration: true, user: usr })
    } else {
      res.json({ registration: false })
    }
  });
});

//* UPDATE edit users AUTH
router.put('/:id([0-9a-f]{24})', (req, res) => {
  userModel.findByIdAndUpdate(req.params.id, {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    location: req.body.location,
  }, {
    new: true,
    select: {
      password: false,
      token: false,
      __v: false
    }
  }, function (error, update) {
    if (error) {
      res.json(error);
    } else {
      res.json(update);
    }
  });
});



//* UPDATE edit users AUTH
router.put('/password', (req, res) => {
  userModel.findById({ _id: req.body.id }, function (error, user) {
    if (error) {
      res.json(error)
    } else {
      userModel.findByIdAndUpdate(req.body.id, {
        password: SHA256(req.body.password + user.token).toString(encBase64)
      }, {
        new: true,
        select: {
          password: false,
          token: false,
          __v: false
        }
      }, function (error, update) {
        if (error) {
          res.json(error);
        } else {
          res.json(update);
        }
      });
    }
  });
});


//* DELETE delete users AUTH
router.delete('/:id([0-9a-f]{24})', (req, res) => {
  userModel.findByIdAndDelete(req.params.id, function (error, user) {
    if (error) {
      res.json(error);
    } else {
      res.json({ message: "ok", user });
    }
  });
});

module.exports = router;
