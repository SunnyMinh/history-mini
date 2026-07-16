const express = require("express");

const {
  getAllPeriods,
  getPeriodById,
  createPeriod,
  updatePeriod,
  deletePeriod,
} = require("../controllers/period.controller");

const {
  getEventsByPeriod,
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
  getAllPeriods
);

router.get(
  "/:periodId/events",
  authenticate,
  getEventsByPeriod
);

router.get(
  "/:id",
  authenticate,
  getPeriodById
);


router.post(
  "/",
  authenticate,
  requireAdmin,
  createPeriod
);


router.post(
  "/",
  authenticate,
  requireAdmin,
  createPeriod
);


router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updatePeriod
);


router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deletePeriod
);


module.exports = router;