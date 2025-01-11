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

  const deleteStudent = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://localhost:8080/students/${studentId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete student");
        }

        // Remove the student from the list without reloading the page
        setStudents(
          students.filter((student) => student.studentId !== studentId)
        );
      } catch (error) {
        setError("Error deleting student");
      }
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-teal-500 uppercase">
        Student Information System
      </h1>
      <div className="my-5">
        <Link
          href="/add-student"
          className="px-3 py-2 bg-teal-600 hover:bg-teal-800 rounded-lg text-white "
        >
          Thêm Student
        </Link>
        <Link
          href="/add-score"
          className="ml-2 px-3 py-2 bg-teal-600 hover:bg-teal-800 rounded-lg text-white"
        >
          Thêm Score
        </Link>
        <Link
          href="/add-subject"
          className="ml-2 px-3 py-2 bg-teal-600 hover:bg-teal-800 rounded-lg text-white"
        >
          Thêm Môn Học
        </Link>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-teal-600 text-white">
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
                <tr key={`${student.studentId}-${index}`}>
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
                    <div className="flex gap-2">
                      <a
                        href={
                          "/add-score?studentScoreId=" + score.studentScoreId
                        }
                      >
                        <svg
                          className="w-6 h-6 fill-purple-500 hover:fill-purple-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152L0 424c0 48.6 39.4 88 88 88l272 0c48.6 0 88-39.4 88-88l0-112c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 112c0 22.1-17.9 40-40 40L88 464c-22.1 0-40-17.9-40-40l0-272c0-22.1 17.9-40 40-40l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24L88 64z" />
                        </svg>
                      </a>

                      <svg
                        className="w-6 h-6 fill-red-600 hover:fill-red-800 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        onClick={() => deleteStudent(student.studentId)}
                      >
                        <path d="M170.5 51.6L151.5 80l145 0-19-28.4c-1.5-2.2-4-3.6-6.7-3.6l-93.7 0c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80 368 80l48 0 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-8 0 0 304c0 44.2-35.8 80-80 80l-224 0c-44.2 0-80-35.8-80-80l0-304-8 0c-13.3 0-24-10.7-24-24S10.7 80 24 80l8 0 48 0 13.8 0 36.7-55.1C140.9 9.4 158.4 0 177.1 0l93.7 0c18.7 0 36.2 9.4 46.6 24.9zM80 128l0 304c0 17.7 14.3 32 32 32l224 0c17.7 0 32-14.3 32-32l0-304L80 128zm80 64l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0l0 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-208c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                      </svg>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr key={student.studentId}>
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
