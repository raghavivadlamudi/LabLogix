// src/pages/ProgramDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/programDetail.css";
import logo from "../assets/logo.png";

export default function ProgramDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [program, setProgram] = useState(null);
  const [error, setError] = useState(null);

  // mockPrograms (source of truth when no location.state provided)
  const mockPrograms = [
    {
      id: "p1",
      title: "2023-AIDS-B",
      image: logo,
      description: "No description provided",
      cost: "Rs. 10.00/-",
      years: [
        {
          label: "I YEAR",
          status: "IN PROGRESS",
          courses: [
            { title: "COMMUNICATIVE ENGLISH", type: "OPT" },
            { title: "ENGINEERING PHYSICS", type: "OPT" },
            { title: "LINEAR ALGEBRA & CALCULUS", type: "OPT" },
            { title: "BASIC CIVIL AND MECHANICAL ENGINEERING", type: "OPT" },
            { title: "INTRODUCTION TO PROGRAMMING", type: "MAN" },
            { title: "VEDIC DIAGNOSTIC TEST", type: "OPT" }
          ]
        },
        { label: "II YEAR–I", courses: [] },
        { label: "II YEAR–II", courses: [] },
        { label: "III YEAR–I", courses: [] },
        { label: "III YEAR–II", courses: [] }
      ]
    }
  ];

  useEffect(() => {
    try {
      console.log("[ProgramDetail] params id=", id);
      console.log("[ProgramDetail] location.state=", location?.state);

      // prefer program passed via navigate state (fast path)
      const passedProgram = location?.state?.program;
      if (passedProgram) {
        setProgram(passedProgram);
        return;
      }

      // fallback to lookup by id in mockPrograms
      const p = mockPrograms.find((x) => x.id === id) || mockPrograms[0];
      if (!p) {
        setError(`Program not found for id="${id}"`);
        return;
      }
      setProgram(p);
    } catch (err) {
      console.error("ProgramDetail init error:", err);
      setError(String(err));
    }
  }, [id, location?.state]);

  // defensive transform: always produce a safeYears array for rendering
  // - if program.years is array -> use it
  // - if it's a number -> create empty shells with labels
  // - otherwise use empty array
  const makeSafeYears = (prog) => {
    if (!prog) return [];
    const y = prog.years;
    if (Array.isArray(y)) return y;
    if (typeof y === "number" && Number.isFinite(y) && y > 0) {
      // convert numeric count into placeholders (keeps UI stable)
      return Array.from({ length: Math.floor(y) }).map((_, idx) => ({
        label: `Year ${idx + 1}`,
        courses: []
      }));
    }
    // if string that contains a number, try to parse
    if (typeof y === "string" && /^\d+$/.test(y.trim())) {
      const n = parseInt(y.trim(), 10);
      return Array.from({ length: n }).map((_, idx) => ({
        label: `Year ${idx + 1}`,
        courses: []
      }));
    }
    return [];
  };

  const [activeTab, setActiveTab] = useState(0);

  // guard UI for loading/error states
  if (error) {
    return (
      <div style={{ padding: 28, fontFamily: "Arial, sans-serif" }}>
        <h2>Program Detail — Error</h2>
        <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
        <div><strong>URL:</strong> {window.location.pathname}</div>
        <div><strong>Params id:</strong> {String(id)}</div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div style={{ padding: 28, fontFamily: "Arial, sans-serif" }}>
        <h2>Loading program…</h2>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>
    );
  }

  // create safeYears for use in render
  const safeYears = makeSafeYears(program);

  // ensure activeTab within bounds
  if (activeTab >= safeYears.length && safeYears.length > 0) {
    // reset to 0 (do not call setState during render; ensure in next tick)
    setTimeout(() => setActiveTab(0), 0);
  }

  return (
    <div className="program-wrapper">
      <div className="breadcrumb" style={{ marginBottom: 10 }}>
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        <span className="crumb-sep"> / </span>
        <span className="crumb-current">{program.title}</span>
      </div>

      <h2 className="program-title">{program.title}</h2>
      <p className="program-desc">{program.description}</p>

      <div className="tabs" style={{ marginBottom: 16 }}>
        {safeYears.map((yr, i) => (
          <button
            key={i}
            className={`tab-btn ${activeTab === i ? "active" : ""}`}
            onClick={() => setActiveTab(i)}
            style={{ marginRight: 8 }}
          >
            {yr.label || `Year ${i + 1}`}
          </button>
        ))}
      </div>

      <div className="detail-box">
        <div className="detail-header">
          <strong>Cost:</strong> {program.cost}
        </div>

        <div className="courses-box">
          <div className="status-badges" style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            {safeYears[activeTab]?.status && (
              <span className="badge inprogress">{safeYears[activeTab].status}</span>
            )}
            <span className="badge completed">COMPLETED</span>
          </div>

          <div className="course-grid">
            {(safeYears[activeTab]?.courses || []).map((c, i) => (
              <div className="course-card" key={i}>
                <span className={`course-type ${String(c.type || "").toLowerCase()}`}>{c.type || ""}</span>
                <p>{c.title}</p>
              </div>
            ))}

            {(safeYears[activeTab]?.courses || []).length === 0 && (
              <div className="no-courses">No courses available</div>
            )}
          </div>
        </div>
      </div>

      <footer className="program-footer" style={{ marginTop: 28 }}>
        Copyrights © 2018, Sri Vishnu Educational Society. All rights reserved.
      </footer>
    </div>
  );
}
