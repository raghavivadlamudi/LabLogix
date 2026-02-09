// src/pages/EvaluateSubmission.jsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const EvaluateSubmission = () => {
  const { submissionId } = useParams();
  const [marks, setMarks] = useState("");
  const [comments, setComments] = useState("");

  const saveEvaluation = async () => {
    await api.put(`/faculty/submissions/${submissionId}`, {
      marks,
      comments,
      status: "evaluated"
    });
    alert("Evaluation Saved");
  };

  return (
    <div>
      <h3>Evaluate Submission</h3>
      <input placeholder="Marks" onChange={e => setMarks(e.target.value)} />
      <textarea placeholder="Comments" onChange={e => setComments(e.target.value)} />
      <button onClick={saveEvaluation}>Save</button>
    </div>
  );
};

export default EvaluateSubmission;
