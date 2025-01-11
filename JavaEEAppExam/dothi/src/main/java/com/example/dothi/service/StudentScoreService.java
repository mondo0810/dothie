package com.example.dothi.service;

import com.example.dothi.dto.StudentScoreDTO;
import com.example.dothi.entity.StudentScore;
import com.example.dothi.mapper.StudentScoreMapper;
import com.example.dothi.repository.StudentScoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentScoreService {

    private final StudentScoreRepository studentScoreRepository;

    private final StudentScoreMapper studentScoreMapper ;

    // ✅ Create a new StudentScore
    public StudentScoreDTO createStudentScore(StudentScoreDTO studentScoreDTO) {
        StudentScore studentScore = studentScoreMapper.toEntity(studentScoreDTO);
        studentScore = studentScoreRepository.save(studentScore);
        return studentScoreMapper.toDTO(studentScore);
    }

    // ✅ Get all StudentScores
    public List<StudentScoreDTO> getAllStudentScores() {
        return studentScoreRepository.findAll().stream()
                .map(studentScoreMapper::toDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get StudentScore by ID
    public StudentScoreDTO getStudentScoreById(Integer studentScoreId) {
        Optional<StudentScore> studentScore = studentScoreRepository.findById(studentScoreId);
        if (studentScore.isPresent()) {
            return studentScoreMapper.toDTO(studentScore.get());
        } else {
            throw new RuntimeException("StudentScore not found with ID: " + studentScoreId);
        }
    }

    // ✅ Update a StudentScore
    public StudentScoreDTO updateStudentScore(Integer studentScoreId, StudentScoreDTO studentScoreDTO) {
        Optional<StudentScore> existingStudentScore = studentScoreRepository.findById(studentScoreId);
        if (existingStudentScore.isPresent()) {
            StudentScore updatedStudentScore = studentScoreMapper.toEntity(studentScoreDTO);
            updatedStudentScore.setStudentScoreId(studentScoreId);
            updatedStudentScore = studentScoreRepository.save(updatedStudentScore);
            return studentScoreMapper.toDTO(updatedStudentScore);
        } else {
            throw new RuntimeException("StudentScore not found with ID: " + studentScoreId);
        }
    }

    // ✅ Delete a StudentScore
    public void deleteStudentScore(Integer studentScoreId) {
        if (studentScoreRepository.existsById(studentScoreId)) {
            studentScoreRepository.deleteById(studentScoreId);
        } else {
            throw new RuntimeException("StudentScore not found with ID: " + studentScoreId);
        }
    }
}
