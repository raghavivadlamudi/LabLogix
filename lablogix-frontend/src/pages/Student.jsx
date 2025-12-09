import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Student() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/student/data')
        setMsg(res.data.message || 'Welcome student')
      } catch (err) {
        setMsg('Error: ' + (err.response?.data?.message || 'Unauthorized'))
      }
    }
    load()
  }, [])

  return (
    <div>
      <h1>Student Dashboard</h1>
      <p>{msg}</p>
    </div>
  )
}
