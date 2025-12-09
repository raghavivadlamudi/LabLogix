import React from 'react'

export default function ProgressCard({ xp = 643809, level = 13, nextLevelXp = 330000 }) {
  const pct = Math.min(100, Math.round((xp / (nextLevelXp || 1)) * 100))
  return (
    <div className="progress-card">
      <h4>Level up!</h4>
      <div className="level-row">
        <div className="big-level">{level}</div>
        <div className="xp-info">
          <div className="xp-count">{xp.toLocaleString()}</div>
          <div className="xp-bar">
            <div className="xp-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="next-level">next level in <strong>{(nextLevelXp - (xp % nextLevelXp)).toLocaleString()}</strong></div>
        </div>
      </div>
    </div>
  )
}
