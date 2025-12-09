// src/components/ProgramCard.jsx
import React from 'react'
import logo from '../assets/logo.png' // fallback thumbnail

export default function ProgramCard({ program = {} }) {
  const { title = 'Program Title', description = 'No Description Provided', years = 1, semesters = 2, courses = 0, image } = program

  return (
    <div className="program-card">
      <div className="program-thumb">
        <img src={image || logo} alt={title} />
      </div>

      <div className="program-body">
        <h5>{title}</h5>
        <p className="program-desc">{description}</p>

        <div className="program-meta">
          <span>Years {years}</span>
          <span>Semesters {semesters}</span>
          <span>Courses {courses}</span>
        </div>

        <div className="program-actions">
          <button className="small-btn" type="button">View Syllabus</button>
          <button className="primary-btn" type="button">View</button>
        </div>
      </div>
    </div>
  )
}
