import React, { useEffect, useState } from 'react'
import usersJson from '../data/users.json'

export default function Admin() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('mock_users') || 'null')
    if (local) setUsers(local)
    else {
      localStorage.setItem('mock_users', JSON.stringify(usersJson))
      setUsers(usersJson)
    }
  }, [])

  const updateRole = (email, newRole) => {
    const updated = users.map(u => u.email === email ? { ...u, role: newRole } : u)
    setUsers(updated)
    localStorage.setItem('mock_users', JSON.stringify(updated))
  }

  const deleteUser = (email) => {
    if (!window.confirm('Delete user ' + email + '?')) return
    const updated = users.filter(u => u.email !== email)
    setUsers(updated)
    localStorage.setItem('mock_users', JSON.stringify(updated))
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Manage users (changes stored in browser storage)</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: 8 }}>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.email} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: 8 }}>{u.name || '-'}</td>
              <td>{u.email}</td>
              <td style={{ textTransform: 'capitalize' }}>{u.role}</td>
              <td>
                <select value={u.role} onChange={(e) => updateRole(u.email, e.target.value)}>
                  <option value="student">student</option>
                  <option value="faculty">faculty</option>
                  <option value="admin">admin</option>
                </select>
                <button style={{ marginLeft: 8 }} onClick={() => deleteUser(u.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
