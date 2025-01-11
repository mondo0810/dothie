package com.example.dothi.service;

import com.example.dothi.dto.StudentDTO;
import com.example.dothi.dto.response.StudentResponseBasicDTO;
import com.example.dothi.dto.response.StudentResponseDTO;
import com.example.dothi.entity.Student;
import com.example.dothi.mapper.StudentMapper;
import com.example.dothi.repository.StudentRepository;
import com.example.dothi.utils.GradeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;

    // ✅ Create a new Student
    public StudentDTO createStudent(StudentDTO studentDTO) {
        Student student = studentMapper.toEntity(studentDTO);
        student = studentRepository.save(student);
        return studentMapper.toDTO(student);
    }

    // ✅ Get all Students
    // Lấy danh sách tất cả sinh viên với điểm số và Grade
    public List<StudentResponseBasicDTO> getistIdStudents() {
       List<Student> students = studentRepository.findAll();
        return studentMapper.toListIdDTO(students) ;
    }

    // ✅ Get all Students
    // Lấy danh sách tất cả sinh viên với điểm số và Grade
    public List<StudentResponseDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(student -> {
                    // Chuyển đổi Student thành StudentResponseDTO
                    StudentResponseDTO studentResponseDTO = studentMapper.toResponseDTO(student);

                    // Tính toán Grade cho từng StudentScoreResponseDTO trong studentScores
                    studentResponseDTO.getStudentScores().forEach(studentScore -> {
                        // Sử dụng GradeUtil để tính Grade từ score1 và score2
                        String grade = GradeUtil.convertScoreToGrade(studentScore.getScore1(), studentScore.getScore2());
                        studentScore.setGrade(grade);  // Gán Grade vào StudentScoreResponseDTO
                    });

                    return studentResponseDTO;
                })
                .collect(Collectors.toList());
    }

    // ✅ Get a Student by ID
    public StudentDTO getStudentById(Integer studentId) {
        Optional<Student> student = studentRepository.findById(studentId);
        if (student.isPresent()) {
            return studentMapper.toDTO(student.get());
        } else {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
    }

    // ✅ Update a Student
    public StudentDTO updateStudent(Integer studentId, StudentDTO studentDTO) {
        Optional<Student> existingStudent = studentRepository.findById(studentId);
        if (existingStudent.isPresent()) {
            Student updatedStudent = studentMapper.toEntity(studentDTO);
            updatedStudent.setStudentId(studentId);
            updatedStudent = studentRepository.save(updatedStudent);
            return studentMapper.toDTO(updatedStudent);
        } else {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
    }

    // ✅ Delete a Student
    public void deleteStudent(Integer studentId) {
        if (studentRepository.existsById(studentId)) {
            studentRepository.deleteById(studentId);
        } else {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
    }
}
