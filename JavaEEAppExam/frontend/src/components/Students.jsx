"use client"; // Ensure this is used for client-side rendering

import Link from "next/link";
import React, { useState, useEffect } from "react";

// Component to display a table of students
const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch students data using useEffect
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/students");
        if (!response.ok) {
          throw new Error("Failed to fetch students data");
        }
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Student List</h1>
      <div className="my-2">
        <Link
          href="/add-student"
          className="p-2 bg-blue-500 rounded-lg text-white "
        >
          Thêm Student
        </Link>
        <Link
          href="/add-score"
          className="ml-2 p-2 bg-blue-500 rounded-lg text-white"
        >
          Thêm Score
        </Link>
        <Link
          href="/add-subject"
          className="ml-2 p-2 bg-blue-500 rounded-lg text-white"
        >
          Thêm Môn Học
        </Link>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left border-b">Student ID</th>
            <th className="px-4 py-2 text-left border-b">Student Code</th>
            <th className="px-4 py-2 text-left border-b">Full Name</th>
            <th className="px-4 py-2 text-left border-b">Address</th>
            <th className="px-4 py-2 text-left border-b">Score 1</th>
            <th className="px-4 py-2 text-left border-b">Score 2</th>
            <th className="px-4 py-2 text-left border-b">Grade</th>
            <th className="px-4 py-2 text-left border-b">Subject Name</th>
            <th className="px-4 py-2 text-left border-b">Credit</th>
            <th className="px-4 py-2 text-left border-b">Control</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) =>
            student.studentScores.length > 0 ? (
              student.studentScores.map((score, index) => (
                <tr
                  key={`${student.studentId}-${index}`}
                  className="odd:bg-gray-50 even:bg-gray-200"
                >
                  {index === 0 ? (
                    // Only render student info (ID, Code, Name, Address) once for the first score entry
                    <>
                      <td
                        className="px-4 py-2 border-b"
                        rowSpan={student.studentScores.length}
                      >
                        {student.studentId}
                      </td>
                      <td
                        className="px-4 py-2 border-b"
                        rowSpan={student.studentScores.length}
                      >
                        {student.studentCode}
                      </td>
                      <td
                        className="px-4 py-2 border-b"
                        rowSpan={student.studentScores.length}
                      >
                        {student.fullName}
                      </td>
                      <td
                        className="px-4 py-2 border-b"
                        rowSpan={student.studentScores.length}
                      >
                        {student.address}
                      </td>
                    </>
                  ) : null}

                  <td className="px-4 py-2 border-b">{score.score1}</td>
                  <td className="px-4 py-2 border-b">{score.score2}</td>
                  <td className="px-4 py-2 border-b">{score.grade}</td>
                  <td className="px-4 py-2 border-b">
                    {score.subject.subjectName}
                  </td>
                  <td className="px-4 py-2 border-b">{score.subject.credit}</td>
                  <td className="px-4 py-2 border-b">
                    <a
                      href={"/add-score?studentScoreId=" + score.studentScoreId}
                    >
                      Edit
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr
                key={student.studentId}
                className="odd:bg-gray-50 even:bg-gray-200"
              >
                <td className="px-4 py-2 border-b" colSpan="1">
                  {student.studentId}
                </td>
                <td className="px-4 py-2 border-b" colSpan="1">
                  {student.studentCode}
                </td>
                <td className="px-4 py-2 border-b" colSpan="1">
                  {student.fullName}
                </td>
                <td className="px-4 py-2 border-b" colSpan="1">
                  {student.address}
                </td>
                <td className="px-4 py-2 border-b" colSpan="3">
                  No scores available
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Students;
