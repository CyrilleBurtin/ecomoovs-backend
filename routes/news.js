const express = require("express");
const router = express.Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/news-controller");

/* GET news list */
router.get("/", controllers.newsList);

//! check user Token for next routes
// router.use(authCheck);

/* POST add news */
router.post("/", controllers.addNews);

/* PUT edit news */
router.put("/", controllers.editNews);

/* DELETE news */
router.delete("/:id([0-9a-f]{24})", controllers.deleteNews);

module.exports = router;
