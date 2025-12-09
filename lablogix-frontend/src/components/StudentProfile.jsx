import React from 'react'

export default function StudentProfile({ name, email, college, dept }) {
  return (
    <div className="profile-card">
      <div className="profile-head">
        <div className="avatar" aria-hidden> {/* placeholder avatar */}</div>
        <div className="profile-meta">
          <h3>{name}</h3>
          <div className="meta-row"><strong>Role:</strong> Student</div>
          <div className="meta-row"><strong>Email Id:</strong> {email}</div>
          <div className="meta-row"><strong>College/Dept:</strong> {dept}</div>
          <div className="meta-row"><strong>University:</strong> {college}</div>
        </div>
      </div>
    </div>
  )
}
