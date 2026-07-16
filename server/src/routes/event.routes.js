const express = require("express");

const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

const {
  authenticate,
} = require("../middleware/auth.middleware");

const {
  requireAdmin,
} = require("../middleware/role.middleware");


const router = express.Router();


router.get(
  "/",
  authenticate,
  getAllEvents
);



router.get(
  "/:id",
  authenticate,
  getEventById
);


router.post(
  "/",
  authenticate,
  requireAdmin,
  createEvent
);



router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateEvent
);


router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteEvent
);


module.exports = router;