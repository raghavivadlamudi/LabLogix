import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentProfile from "../components/StudentProfile";
import ProgressCard from "../components/ProgressCard";
import ProgramCard from "../components/ProgramCard";
import "../styles/student.css";
import assignments from "../data/assignments.json";
import logo from "../assets/logo.png";

export default function Student() {
  const regno = localStorage.getItem("regno"); // from login

  const [student, setStudent] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState("");

  const [programs, setPrograms] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [stats, setStats] = useState({
    enrolled: 0,
    inProgress: 0,
    completed: 0,
    coursesEnrolled: 0
  });

  // 🔹 FETCH STUDENT PROFILE
  useEffect(() => {
    if (!regno) {
      setError("No regno found in localStorage");
      setLoadingProfile(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/students/profile/${regno}`)
      .then((res) => {
        console.log("PROFILE DATA:", res.data); // ⭐ DEBUG
        setStudent(res.data);
        setLoadingProfile(false);
      })
      .catch((err) => {
        console.error("Profile fetch error:", err.response?.data || err.message);
        setError("Profile not found");
        setLoadingProfile(false);
      });
  }, [regno]);

  // 🔹 LOAD MOCK PROGRAM DATA (UI only)
  useEffect(() => {
    const t = setTimeout(() => {
      const mockPrograms = [
        {
          id: "p1",
          title: "2023-AIDS-B",
          image: logo,
          description: "No Description Provided",
          years: [
            {
              label: "I YEAR",
              status: "IN PROGRESS",
              courses: [
                { title: "COMMUNICATIVE ENGLISH", type: "OPT" },
                { title: "ENGINEERING PHYSICS", type: "OPT" },
                { title: "LINEAR ALGEBRA & CALCULUS", type: "OPT" },
                { title: "BASIC CIVIL AND MECHANICAL ENGINEERING", type: "OPT" },
                { title: "INTRODUCTION TO PROGRAMMING", type: "MAN" },
                { title: "VEDIC DIAGNOSTIC TEST", type: "OPT" }
              ]
            }
          ],
          semesters: 6,
          courses: 51
        }
      ];

      setPrograms(mockPrograms);
      setStats({
        enrolled: mockPrograms.length,
        inProgress: 1,
        completed: 0,
        coursesEnrolled: assignments?.length || 0
      });

      setLoadingPrograms(false);
    }, 100);

    return () => clearTimeout(t);
  }, []);

  // 🔴 LOADING STATE
  if (loadingProfile) {
    return <div className="loader">Loading profile...</div>;
  }

  // 🔴 ERROR STATE
  if (error) {
    return <div className="loader">{error}</div>;
  }

  // 🟢 MAIN RENDER (STUDENT FOUND)
  return (
    <div className="student-page">
      <div className="student-top">
        <div className="left-col">
          <StudentProfile
            name={student.name}
            email={student.email}
            college="Shri Vishnu Engineering College for Women, Bhimavaram"
            dept={student.branch}
          />

          <ProgressCard xp={643809} level={13} nextLevelXp={330000} />
        </div>

        <div className="right-col">
          <div className="summary-box">
            <h4>MY PROGRAMS</h4>
            <div className="pills-row">
              <div className="pill enrolled">
                Enrolled <span>{stats.enrolled}</span>
              </div>
              <div className="pill inprogress">
                In-progress <span>{stats.inProgress}</span>
              </div>
              <div className="pill completed">
                Completed <span>{stats.completed}</span>
              </div>
            </div>

            <h4 style={{ marginTop: 18 }}>MY COURSES</h4>
            <div className="pills-row">
              <div className="pill enrolled small">
                Enrolled <span>{stats.coursesEnrolled}</span>
              </div>
              <div className="pill inprogress small">
                In-progress <span>0</span>
              </div>
              <div className="pill completed small">
                Completed <span>0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="student-bottom">
        <div className="programs-area">
          <div className="tabs-row">
            <button className="tab active">MY PROGRAMS</button>
            <button className="tab">MY COURSES</button>

            <div className="search-wrap">
              <input placeholder="Search" className="search-input" />
              <div className="status-filters">
                <button className="filter inprog">In-progress</button>
                <button className="filter completed">Completed</button>
              </div>
            </div>
          </div>

          {loadingPrograms ? (
            <div className="loader">Loading programs…</div>
          ) : (
            <div className="program-list">
              {programs.map((p) => (
                <div key={p.id} className="program-wrapper">
                  <ProgramCard program={p} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right-blank" />
      </div>
    </div>
  );
}
