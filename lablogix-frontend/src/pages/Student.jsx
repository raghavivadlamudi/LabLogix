import React, { useEffect, useState } from 'react'
import StudentProfile from '../components/StudentProfile'
import ProgressCard from '../components/ProgressCard'
import ProgramCard from '../components/ProgramCard'
import '../styles/student.css'
import assignments from '../data/assignments.json'
import logo from '../assets/logo.png'

export default function Student() {
  const email = localStorage.getItem('email') || 'student1@lablogix.com'
  const [programs, setPrograms] = useState([]) // empty -> show program list
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ enrolled: 0, inProgress: 0, completed: 0, coursesEnrolled: 0 })

  // Load mock data once (safe - dependency array empty)
  useEffect(() => {
    // small simulated delay to show loading state
    const t = setTimeout(() => {
      // inside Student.jsx useEffect replace mockPrograms with this
const mockPrograms = [
  {
    id: 'p1',
    title: '2023-AIDS-B',
    image: logo,
    description: 'No Description Provided',
    // years must be an array of year objects, each with courses array
    years: [
      {
        label: 'I YEAR',
        status: 'IN PROGRESS',
        courses: [
          { title: 'COMMUNICATIVE ENGLISH', type: 'OPT' },
          { title: 'ENGINEERING PHYSICS', type: 'OPT' },
          { title: 'LINEAR ALGEBRA & CALCULUS', type: 'OPT' },
          { title: 'BASIC CIVIL AND MECHANICAL ENGINEERING', type: 'OPT' },
          { title: 'INTRODUCTION TO PROGRAMMING', type: 'MAN' },
          { title: 'VEDIC DIAGNOSTIC TEST', type: 'OPT' }
        ]
      },
      { label: 'II YEAR–I', courses: [] },
      { label: 'II YEAR–II', courses: [] },
      { label: 'III YEAR–I', courses: [] },
      { label: 'III YEAR–II', courses: [] }
    ],
    // keep summary numbers if you want to show them in cards
    semesters: 6,
    courses: 51
  }
];

      setPrograms(mockPrograms)
      setStats({
        enrolled: mockPrograms.length,
        inProgress: 1,
        completed: 0,
        coursesEnrolled: assignments?.length || 0
      })
      setLoading(false)
    }, 100)

    return () => clearTimeout(t)
  }, [])

  return (
    <div className="student-page">
      <div className="student-top">
        <div className="left-col">
          <StudentProfile
            name="LALITHA SRI SANTHOSHI VAJJIPARTHI"
            email={email}
            college="Shri Vishnu Engineering College for Women, Bhimavaram"
            dept="Artificial Intelligence and Data Science"
          />

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

          {loading ? (
            <div className="loader">Loading programs…</div>
          ) : (
            <div className="program-list">
              {programs.length === 0 ? (
                <div className="empty">No programs found.</div>
              ) : (
                programs.map(p => (
                  <div key={p.id} className="program-wrapper">
                    <ProgramCard program={p} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="right-blank">
          {/* reserved for announcements / widgets */}
        </div>
      </div>
    </div>
  )
}
