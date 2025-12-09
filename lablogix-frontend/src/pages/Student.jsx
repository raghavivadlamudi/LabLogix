import React, { useEffect, useState } from 'react'
import StudentProfile from '../components/StudentProfile'
import ProgressCard from '../components/ProgressCard'
import ProgramCard from '../components/ProgramCard'
import '../styles/student.css'
import assignments from '../data/assignments.json' // optional, used for counts

export default function Student() {
  const email = localStorage.getItem('email') || 'student1@lablogix.com'
  const [programs, setPrograms] = useState([])
  const [stats, setStats] = useState({ enrolled: 1, inProgress: 1, completed: 0, coursesEnrolled: 0 })

  useEffect(() => {
    // Example mock programs — you can replace this or load from data file
    const mockPrograms = [
      {
        id: 'p1',
        title: '2023-AIDS-B',
        image: '/src/assets/logo.png',
        years: 1,
        semesters: 2,
        courses: 5,
        description: 'No Description Provided'
      }
    ]
    setPrograms(mockPrograms)

    // derive some sample stats (replace with real data later)
    setStats({
      enrolled: mockPrograms.length,
      inProgress: 1,
      completed: 0,
      coursesEnrolled: assignments?.length || 0
    })
  }, [])

  return (
    <div className="student-page">
      <div className="student-top">
        <div className="left-col">
          <StudentProfile name="Lalitha Sri Santhoshi" email={email} college="Sri Vishnu Engineering College for Women" dept="AI & Data Science" />
          <ProgressCard xp={643809} level={13} nextLevelXp={330000} />
        </div>

        <div className="right-col">
          <div className="summary-box">
            <h4>MY PROGRAMS</h4>
            <div className="pills-row">
              <div className="pill enrolled">Enrolled <span>{stats.enrolled}</span></div>
              <div className="pill inprogress">In-progress <span>{stats.inProgress}</span></div>
              <div className="pill completed">Completed <span>{stats.completed}</span></div>
            </div>

            <h4 style={{ marginTop: 18 }}>MY COURSES</h4>
            <div className="pills-row">
              <div className="pill enrolled small">Enrolled <span>{stats.coursesEnrolled}</span></div>
              <div className="pill inprogress small">In-progress <span>0</span></div>
              <div className="pill completed small">Completed <span>0</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="student-bottom">
        <div className="programs-area">
          <div className="tabs-row">
            <button className="tab active">MY PROGRAMS</button>
            <button className="tab">MY COURSES</button>

            <div className="search-wrap">
              <input placeholder="Search" className="search-input" />
              <div className="status-filters">
                <button className="filter inprog">In-progress</button>
                <button className="filter completed">Completed</button>
              </div>
            </div>
          </div>

          <div className="program-list">
            {programs.map(p => <ProgramCard key={p.id} program={p} />)}
          </div>
        </div>

        <div className="right-blank">
          {/* reserved for future widgets */}
        </div>
      </div>
    </div>
  )
}
