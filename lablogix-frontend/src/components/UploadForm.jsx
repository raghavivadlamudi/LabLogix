import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid' // run: npm install uuid

export default function UploadForm({ assignmentId, currentUserEmail, onSubmitted }) {
  const [file, setFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) return alert('Choose a file first')

    setSubmitting(true)

    // simulate upload + store submission in localStorage
    setTimeout(() => {
      const submissions = JSON.parse(localStorage.getItem('mock_submissions') || '[]')
      const newSub = {
        id: uuidv4(),
        assignmentId,
        studentEmail: currentUserEmail,
        fileName: file.name,
        submittedAt: new Date().toISOString(),
        status: 'submitted',
        grade: null,
        feedback: ''
      }
      submissions.push(newSub)
      localStorage.setItem('mock_submissions', JSON.stringify(submissions))
      setSubmitting(false)
      setFile(null)
      onSubmitted && onSubmitted(newSub)
    }, 700)
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
      <input type="file" onChange={handleFileChange} />
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={submitting} style={{ padding: '8px 12px' }}>
          {submitting ? 'Uploading...' : 'Upload Submission'}
        </button>
      </div>
    </form>
  )
}
