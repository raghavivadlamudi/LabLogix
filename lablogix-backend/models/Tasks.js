import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    className: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    facultyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Faculty"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
