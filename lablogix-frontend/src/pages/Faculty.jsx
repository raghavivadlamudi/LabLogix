import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Faculty() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/faculty/data')
        setMsg(res.data.message || 'Welcome faculty')
      } catch (err) {
        setMsg('Error: ' + (err.response?.data?.message || 'Unauthorized'))
      }
    }
    load()
  }, [])

  return (
    <div>
      <h1>Faculty Dashboard</h1>
      <p>{msg}</p>
    </div>
  )
}
