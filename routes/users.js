const router = require("express").Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/users-controller");

// Login
router.post("/login", controllers.login);

// POST add new users
router.post("/", controllers.addUser);

// ! check user Token for next routes
// router.use(authCheck);

// GET users listing
router.get("/", controllers.usersList);

// UPDATE edit users
router.put("/:id([0-9a-f]{24})", controllers.editUser);

// UPDATE edit users
router.put("/password", controllers.password);

// DELETE delete users
router.delete("/:id([0-9a-f]{24})", controllers.deleteUser);

module.exports = router;
