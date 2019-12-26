const express = require("express");
const router = express.Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/moovs-controller");
// const fileUpload = require('../middleware/file-upload')
/* GET moov list */
router.get("/", controllers.moovList);

//! check user Token for next routes
// router.use(authCheck);

/* POST add moov */
router.post("/", controllers.addMoov);
// router.post("/", fileUpload.single('image'),controllers.addMoov);

/* PUT edit moov */
router.put("/", controllers.editMoov);

/* DELETE moov */
router.delete("/:id([0-9a-f]{24})", controllers.deleteMoov);

module.exports = router;