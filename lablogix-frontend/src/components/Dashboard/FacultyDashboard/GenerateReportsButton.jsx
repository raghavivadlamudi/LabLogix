import React from "react";

export default function GenerateReportsButton() {
  const handleGenerate = () => {
    alert("Generating internal + external evaluation report...");
    // Call backend API to generate PDF reports
  };

  return (
    <button
      className="bg-green-500 text-white px-4 py-2 rounded"
      onClick={handleGenerate}
    >
      Generate Reports
    </button>
  );
}
