"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

// Component để thêm sinh viên mới
const AddStudent = () => {
  // State để lưu thông tin form
  const [studentCode, setStudentCode] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Hàm xử lý khi form được gửi
  const handleSubmit = async (event) => {
    event.preventDefault(); // Ngừng tải lại trang

    const studentData = {
      studentCode,
      fullName,
      address,
    };

    setLoading(true);
    setMessage(""); // Reset message trước khi gửi yêu cầu

    try {
      const response = await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "*/*",
        },
        body: JSON.stringify(studentData),
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      setMessage("Student added successfully!");
      setStudentCode(""); // Reset form
      setFullName("");
      setAddress("");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Add New Student</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label htmlFor="studentCode" className="block text-sm font-medium">
            Student Code
          </label>
          <input
            type="text"
            id="studentCode"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {loading ? "Adding..." : "Add Student"}
          </button>
        </div>
      </form>

      {message && (
        <div className="mt-4 text-center text-red-500">{message}</div>
      )}
    </div>
  );
};

export default AddStudent;
