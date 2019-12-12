const express = require("express");
const router = express.Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/moovs-controller");

/* GET moov list */
router.get("/", controllers.moovList);

//! check user Token for next routes
router.use(authCheck);

/* Upload photo */
router.post("/photo", controllers.addPhoto);

/* POST add moov */
router.post("/", controllers.addMoov);

/* PUT edit moov */
router.put("/", controllers.editMoov);

/* DELETE moov */
router.delete("/:id([0-9a-f]{24})", controllers.deleteMoov);

module.exports = router;
