const express = require("express");
const router = express.Router();
const { rideShareSchema } = require("../joiSchema");
const AppError = require("../utilities/appError");
const asyncCatcher = require("../utilities/asyncCatcher");
const RideShare = require("../models/rideShare");
const {
  isAuthenticated,
  isCreator,
  validateRideShare,
} = require("../middleware/middleware");
const rideShare = require("../controllers/rideShares");
const multer = require("multer");
const { storage } = require("../cloudinary/index");
const { array } = require("joi");
const upload = multer({ storage });

// Restaurant Index Page
router
  .route("/")
  .get(asyncCatcher(rideShare.renderIndex))
  //Create New RideShare Endpoint
  .post(
    isAuthenticated,
    upload.array("image"),
    validateRideShare,
    asyncCatcher(rideShare.postNewRideShare)
  );

// RENDER NEW Rideshare page---------------------------------------
router.get("/new", isAuthenticated, rideShare.renderNew);

// render EJS SHOW --------------------------

router
  .route("/:id")
  // Show Individual Rideshare Details
  .get(asyncCatcher(rideShare.renderShow))
  // Update Rideshare Enpoint
  .put(
    isAuthenticated,
    isCreator,
    upload.array("image"),
    validateRideShare,
    asyncCatcher(rideShare.updateRideShare)
  );

// RENDER THE EDIT PAGE ---------------------------------------
router.get(
  "/:id/edit",
  isAuthenticated,
  isCreator,
  asyncCatcher(rideShare.renderEdit)
);

// DELETING Rideshares CARD ----------------------------------------
router.delete(
  "/:id/delete",
  isAuthenticated,
  isCreator,
  asyncCatcher(rideShare.deleteRideShare)
);

module.exports = router;
