package com.example.dothi.service;


import com.example.dothi.dto.SubjectDTO;
import com.example.dothi.dto.response.SubjectResponseDTO;
import com.example.dothi.entity.Subject;
import com.example.dothi.mapper.SubjectMapper;
import com.example.dothi.repository.SubjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubjectService {

    private final SubjectRepository subjectRepository;

    private final SubjectMapper subjectMapper ;

    // ✅ Create a new Subject
    public SubjectDTO createSubject(SubjectDTO subjectDTO) {
        Subject subject = subjectMapper.toEntity(subjectDTO);
        subject = subjectRepository.save(subject);
        return subjectMapper.toDTO(subject);
    }

    // ✅ Get all Subjects
    public List<SubjectResponseDTO> getAllSubjects() {
        return subjectRepository.findAll().stream()
                .map(subjectMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // ✅ Get Subject by ID
    public SubjectDTO getSubjectById(Integer subjectId) {
        Optional<Subject> subject = subjectRepository.findById(subjectId);
        if (subject.isPresent()) {
            return subjectMapper.toDTO(subject.get());
        } else {
            throw new RuntimeException("Subject not found with ID: " + subjectId);
        }
    }

    // ✅ Update a Subject
    public SubjectDTO updateSubject(Integer subjectId, SubjectDTO subjectDTO) {
        Optional<Subject> existingSubject = subjectRepository.findById(subjectId);
        if (existingSubject.isPresent()) {
            Subject updatedSubject = subjectMapper.toEntity(subjectDTO);
            updatedSubject.setSubjectId(subjectId);
            updatedSubject = subjectRepository.save(updatedSubject);
            return subjectMapper.toDTO(updatedSubject);
        } else {
            throw new RuntimeException("Subject not found with ID: " + subjectId);
        }
    }

    // ✅ Delete a Subject
    public void deleteSubject(Integer subjectId) {
        if (subjectRepository.existsById(subjectId)) {
            subjectRepository.deleteById(subjectId);
        } else {
            throw new RuntimeException("Subject not found with ID: " + subjectId);
        }
    }
}
