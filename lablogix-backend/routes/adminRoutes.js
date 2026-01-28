import express from "express";

const router = express.Router();

// ===============================
// TEST ROUTE
// ===============================
router.get("/test", (req, res) => {
  res.send("ADMIN ROUTES WORKING");
});


export default router;   // ⭐ THIS LINE IS 100% REQUIRED
