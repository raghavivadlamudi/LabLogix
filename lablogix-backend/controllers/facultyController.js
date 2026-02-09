import Task from "../models/Task.js";
import Submission from "../models/Submission.js";

// 🟢 Create a task
export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.json({ message: "Task created successfully", task });
  } catch (err) {
    res.status(500).json({ message: "Error creating task" });
  }
};

// 🟢 Get all tasks (faculty view)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("facultyId", "name email");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

// 🟢 Get submissions for a task
export const getTaskSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({
      courseId: req.params.taskId
    }).populate("studentId", "name regno email");

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching submissions" });
  }
};

// 🟢 Evaluate student submission
export const evaluateSubmission = async (req, res) => {
  try {
    const updated = await Submission.findByIdAndUpdate(
      req.params.submissionId,
      {
        marks: req.body.marks,
        feedback: req.body.feedback
      },
      { new: true }
    );

    res.json({ message: "Evaluation saved", updated });
  } catch (err) {
    res.status(500).json({ message: "Error evaluating submission" });
  }
};
