import React, { useEffect, useState } from 'react';
import api from '../api/api';

export default function StudentDashboard(){
  const [student, setStudent] = useState(null);
  const [academics, setAcademics] = useState([]);
  const [openYear, setOpenYear] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/students/me');
        setStudent(res.data.student);
        setAcademics(res.data.academics);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  if (!student) return <div>Loading...</div>;

  // group academics by year
  const grouped = academics.reduce((acc, item) => {
    acc[item.year] = acc[item.year] || [];
    acc[item.year].push(item);
    return acc;
  }, {});

  return (
    <div className="student-dashboard p-4">
      <div className="profile-card border p-3 rounded mb-4">
        <h2>Welcome, {student.name}</h2>
        <p><b>Roll:</b> {student.roll}</p>
        <p><b>Email:</b> {student.email}</p>
        <p><b>Department:</b> {student.department.name}</p>
        <p><b>Section:</b> {student.section}</p>
      </div>

      <div className="academic-view">
        <h3>Academic View (Semester-wise Labs)</h3>
        {Object.keys(grouped).map(year => (
          <div key={year} className="year-block mb-3">
            <button className="year-toggle" onClick={() => setOpenYear(openYear === year ? null : year)}>
              {year} {openYear === year ? '▲' : '▼'}
            </button>

            {openYear === year && (
              <div className="semesters mt-2">
                {grouped[year].map(sem => (
                  <div key={sem._id} className="semester card p-2 mb-2">
                    <h5>{sem.semester}</h5>
                    <ul>
                      {sem.subjects.map(s => (
                        <li key={s._id}>
                          {s.name} {s.faculty ? `- ${s.faculty.name}` : ''}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
