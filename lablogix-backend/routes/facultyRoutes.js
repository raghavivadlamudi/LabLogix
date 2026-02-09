import express from "express";
import {
  createTask,
  getTasks,
  getTaskSubmissions,
  evaluateSubmission
} from "../controllers/facultyController.js";

const router = express.Router();

// Faculty APIs
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:taskId/submissions", getTaskSubmissions);
router.put("/submissions/:submissionId", evaluateSubmission);

export default router;
