const express = require("express");
const router = express.Router();
const authCheck = require("../libs/auth");
const controllers = require("../controllers/event-controller");

/* GET event list */
router.get("/", controllers.eventList);

//! check user Token for next routes
router.use(authCheck);

/* POST add event */
router.post("/", controllers.addevent);

/* PUT edit event */
router.put("/", controllers.editevent);

/* DELETE event */
router.delete("/:id([0-9a-f]{24})", controllers.deleteevent);

module.exports = router;
