package com.example.dothi.controller;


import com.example.dothi.dto.StudentScoreDTO;
import com.example.dothi.service.StudentScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student-scores")
@RequiredArgsConstructor
public class StudentScoreController {

    private final StudentScoreService studentScoreService;

    // ✅ Create a new StudentScore
    @PostMapping
    public ResponseEntity<StudentScoreDTO> createStudentScore(@RequestBody StudentScoreDTO studentScoreDTO) {
        return ResponseEntity.ok(studentScoreService.createStudentScore(studentScoreDTO));
    }

    // ✅ Get all StudentScores
    @GetMapping
    public ResponseEntity<List<StudentScoreDTO>> getAllStudentScores() {
        return ResponseEntity.ok(studentScoreService.getAllStudentScores());
    }

    // ✅ Get a StudentScore by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentScoreDTO> getStudentScoreById(@PathVariable Integer id) {
        return ResponseEntity.ok(studentScoreService.getStudentScoreById(id));
    }

    // ✅ Update a StudentScore
    @PutMapping("/{id}")
    public ResponseEntity<StudentScoreDTO> updateStudentScore(@PathVariable Integer id, @RequestBody StudentScoreDTO studentScoreDTO) {
        return ResponseEntity.ok(studentScoreService.updateStudentScore(id, studentScoreDTO));
    }

    // ✅ Delete a StudentScore
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentScore(@PathVariable Integer id) {
        studentScoreService.deleteStudentScore(id);
        return ResponseEntity.noContent().build();
    }
}
