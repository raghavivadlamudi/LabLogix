import React, { useEffect, useState } from 'react'
import submissionsJson from '../data/submissions.json'
import SubmissionsTable from '../components/SubmissionsTable'

export default function Faculty() {
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    // load from localStorage if any, else use default JSON file
    const mock = JSON.parse(localStorage.getItem('mock_submissions') || 'null')
    if (mock) setSubmissions(mock)
    else {
      // seed from data file
      localStorage.setItem('mock_submissions', JSON.stringify(submissionsJson))
      setSubmissions(submissionsJson)
    }
  }, [])

  const handleGrade = (submission) => {
    const grade = prompt(`Enter grade for ${submission.studentEmail} (${submission.fileName})`, submission.grade ?? '')
    if (grade === null) return
    const feedback = prompt('Optional feedback', submission.feedback || '')
    const updated = submissions.map(s => s.id === submission.id ? { ...s, grade, feedback, status: 'graded' } : s)
    setSubmissions(updated)
    localStorage.setItem('mock_submissions', JSON.stringify(updated))
    alert('Graded successfully')
  }

  return (
    <div>
      <h1>Faculty Dashboard</h1>
      <p>Submissions (live from browser storage)</p>
      <SubmissionsTable submissions={submissions} onGrade={handleGrade} />
    </div>
  )
}
