"use client";

import React, { useState } from "react";

// Component để thêm môn học mới
const AddSubject = () => {
  // State để lưu thông tin form
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [credit, setCredit] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Hàm xử lý khi form được gửi
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngừng tải lại trang

    const subjectData = {
      subjectCode,
      subjectName,
      credit: parseInt(credit),
    };

    setLoading(true);
    setMessage(""); // Reset message trước khi gửi yêu cầu

    try {
      const response = await fetch("http://localhost:8080/subjects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(subjectData),
      });

      if (!response.ok) {
        throw new Error("Failed to add subject");
      }

      setMessage("Subject added successfully!");
      setSubjectCode(""); // Reset form
      setSubjectName("");
      setCredit(0);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Add New Subject</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        {/* Mã môn học */}
        <div>
          <label htmlFor="subjectCode" className="block text-sm font-medium">
            Subject Code
          </label>
          <input
            type="text"
            id="subjectCode"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Tên môn học */}
        <div>
          <label htmlFor="subjectName" className="block text-sm font-medium">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Số tín chỉ */}
        <div>
          <label htmlFor="credit" className="block text-sm font-medium">
            Credit
          </label>
          <input
            type="number"
            id="credit"
            value={credit}
            onChange={(e) => setCredit(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
            min="0"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Subject"}
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default AddSubject;
