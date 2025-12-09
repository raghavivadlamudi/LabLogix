import React from 'react'

export default function SubmissionsTable({ submissions = [], onGrade }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
          <th style={{ padding: '8px' }}>Student</th>
          <th>Assignment</th>
          <th>File</th>
          <th>Submitted At</th>
          <th>Status</th>
          <th>Grade</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map(s => (
          <tr key={s.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
            <td style={{ padding: '8px' }}>{s.studentEmail}</td>
            <td>{s.assignmentId}</td>
            <td>{s.fileName}</td>
            <td>{new Date(s.submittedAt).toLocaleString()}</td>
            <td>{s.status}</td>
            <td>{s.grade ?? '-'}</td>
            <td>
              <button onClick={() => onGrade(s)} style={{ padding: '6px 10px' }}>Grade</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
