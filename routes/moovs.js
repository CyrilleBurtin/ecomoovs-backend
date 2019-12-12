const express = require("express");
const router = express.Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/moovs-controller")

/* GET moov list */
router.get("/", controllers.moovList);

/* Upload photo */
router.post("/photo", controllers.addPhoto);

/* POST add moov */
router.post("/", controllers.addMoov);

// check user Token for next routes
router.use(authCheck);

/* PUT edit moov */
router.put("/", controllers.editMoov);

/* DELETE moov */
router.delete("/:id([0-9a-f]{24})", controllers.deleteMoov);

module.exports = router;
