// src/components/ProgramCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProgramCard({ program = {} }) {
  const navigate = useNavigate();
  const {
    id = p1,
    title = "Program",
    image = "/src/assets/logo.png",
    years = "-",
    semesters = "-",
    courses = "-"
  } = program;

  const handleView = () => {
    if (!id) {
      console.warn("ProgramCard: missing program.id, cannot navigate to ProgramDetail", program);
      return;
    }
    // navigate to /program/:id and pass the program object in location state (optional)
    navigate(`/program/${id}`, { state: { program } });
  };

  return (
    <article className="program-card" aria-labelledby={`program-${id}-title`}>
      <div className="program-thumb" style={{ textAlign: "center", padding: 14 }}>
        <img
          src={image}
          alt={title}
          className="program-img"
          style={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      <div style={{ padding: "12px 16px" }}>
        <h3 id={`program-${id}-title`} className="program-title" style={{ margin: "6px 0" }}>
          {title}
        </h3>

        <p className="program-desc" style={{ color: "#666", margin: "6px 0 12px" }}>
          No Description Provided
        </p>

        <div className="program-info" style={{ fontSize: 14, color: "#444", marginBottom: 12 }}>
  Years {Array.isArray(program.years) ? program.years.length : program.years} &nbsp; · &nbsp; Semesters {program.semesters} &nbsp; · &nbsp; Courses {program.courses}
</div>


        <div className="program-buttons" style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            className="syllabus-btn"
            onClick={() => navigate(`/program/${id}/syllabus`)}
            aria-label={`View syllabus for ${title}`}
          >
            View Syllabus
          </button>

          <button
            type="button"
            className="view-btn"
            onClick={handleView}
            aria-label={`Open ${title} program details`}
          >
            View
          </button>
        </div>
      </div>
    </article>
  );
}
