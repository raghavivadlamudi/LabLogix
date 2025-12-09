import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Admin() {
  const [msg, setMsg] = useState('Loading...')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/api/admin/data')
        setMsg(res.data.message || 'Welcome admin')
      } catch (err) {
        setMsg('Error: ' + (err.response?.data?.message || 'Unauthorized'))
      }
    }
    load()
  }, [])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>{msg}</p>
    </div>
  )
}
