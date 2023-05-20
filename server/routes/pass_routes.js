const express = require("express");
const passController = require("../controllers/pass_controller");

const router = express.Router();

// Create a new pass
router.post("/", passController.createPass);

// Get all passes
router.get("/", passController.getAllPasses);

// Check pass approval status
router.get("/check_approval/:passId", passController.checkPassApproval);

// Update a pass
router.put("/:id", passController.updatePass);

// Delete a pass
router.delete("/:id", passController.deletePass);

module.exports = router;
