const express = require("express");

const {
  getAllUsers,
  getUserById,
  createUser,
} = require("../controllers/user.controller");

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
  requireAdmin,
  getAllUsers
);



router.get(
  "/:id",
  authenticate,
  requireAdmin,
  getUserById
);



router.post(
  "/",
  authenticate,
  requireAdmin,
  createUser
);


module.exports = router;