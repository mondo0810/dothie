"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Component để thêm hoặc chỉnh sửa điểm cho sinh viên
const AddOrEditScore = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentScoreId = searchParams.get("studentScoreId"); // Lấy id từ URL nếu có

  // State để lưu thông tin form
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [score1, setScore1] = useState("");
  const [score2, setScore2] = useState("");
  const [grade, setGrade] = useState(""); // Nếu cần thiết, có thể thêm trường grade
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch danh sách sinh viên và môn học khi component được tải
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setMessage("Failed to fetch students");
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/subjects");
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        setMessage("Failed to fetch subjects");
      }
    };

    // Fetch dữ liệu của điểm khi có studentScoreId
    if (studentScoreId) {
      const fetchScore = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/student-scores/${studentScoreId}`
          );
          const data = await response.json();
          setStudentId(data.studentId);
          setSubjectId(data.subjectId);
          setScore1(data.score1);
          setScore2(data.score2);
          // Nếu có grade trong response, bạn có thể gán giá trị cho grade nếu cần
          // setGrade(data.grade); // Nếu bạn có trường grade trong dữ liệu trả về
        } catch (error) {
          setMessage("Failed to fetch score details");
        }
      };
      fetchScore();
    }

    fetchStudents();
    fetchSubjects();
  }, [studentScoreId]);

  // Hàm xử lý khi form được gửi
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngừng tải lại trang

    const scoreData = {
      studentId: parseInt(studentId),
      subjectId: parseInt(subjectId),
      score1: parseFloat(score1),
      score2: parseFloat(score2),
      grade,
    };

    setLoading(true);
    setMessage(""); // Reset message trước khi gửi yêu cầu

    try {
      let response;
      if (studentScoreId) {
        // Nếu có studentScoreId, thực hiện PUT
        response = await fetch(
          `http://localhost:8080/student-scores/${studentScoreId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              accept: "*/*",
            },
            body: JSON.stringify(scoreData),
          }
        );
      } else {
        // Nếu không có studentScoreId, thực hiện POST
        response = await fetch("http://localhost:8080/student-scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify(scoreData),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      setMessage(
        studentScoreId
          ? "Score updated successfully!"
          : "Score added successfully!"
      );
      setStudentId(""); // Reset form
      setSubjectId("");
      setScore1("");
      setScore2("");
      setGrade("");
      router.push("/"); // Điều hướng về trang danh sách sinh viên
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 ">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {studentScoreId ? "Edit Score" : "Add Score"} for Student
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        {/* Chọn sinh viên */}
        <div>
          <label
            htmlFor="studentId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Student
          </label>
          <select
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Student</option>
            {students.map((student) => (
              <option key={student.studentId} value={student.studentId}>
                {student.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Chọn môn học */}
        <div>
          <label
            htmlFor="subjectId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Subject
          </label>
          <select
            id="subjectId"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.subjectId} value={subject.subjectId}>
                {subject.subjectName}
              </option>
            ))}
          </select>
        </div>

        {/* Điểm */}
        <div>
          <label
            htmlFor="score1"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Score 1
          </label>
          <input
            type="number"
            id="score1"
            value={score1}
            onChange={(e) => setScore1(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="100"
          />
        </div>

        <div>
          <label
            htmlFor="score2"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Score 2
          </label>
          <input
            type="number"
            id="score2"
            value={score2}
            onChange={(e) => setScore2(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
            max="100"
          />
        </div>

        {/* Nút Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-300"
          >
            {loading
              ? "Saving..."
              : studentScoreId
              ? "Update Score"
              : "Add Score"}
          </button>
        </div>
      </form>

      {/* Thông báo lỗi hoặc thành công */}
      {message && (
        <div className="mt-4 text-center text-red-500 text-sm">{message}</div>
      )}
    </div>
  );
};

export default AddOrEditScore;
