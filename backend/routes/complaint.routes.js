const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");

const { 
  createComplaint, 
  getComplaint, 
  listMyComplaints 
} = require("../controllers/complaint.controller");

const { protect } = require("../middleware/auth.middleware");



// Submit complaint (requires login)
router.post("/", protect, upload.array("photos"), createComplaint);

// Get user's complaints (protected) — exact path first
router.get("/user/me/list", protect, listMyComplaints);

// Get single complaint (by id) — dynamic route should be LAST
router.get("/:id", protect, getComplaint);

module.exports = router;
