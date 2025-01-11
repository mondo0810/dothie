package com.example.dothi.mapper;

import com.example.dothi.dto.StudentDTO;
import com.example.dothi.dto.response.StudentResponseBasicDTO;
import com.example.dothi.dto.response.StudentResponseDTO;
import com.example.dothi.entity.Student;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    // Entity to DTO
    StudentResponseDTO toResponseDTO(Student student);

    // Entity to DTO
    StudentDTO toDTO(Student student);

    // Entity to DTO
    List<StudentResponseBasicDTO> toListIdDTO(List<Student> students);

    // DTO to Entity
    Student toEntity(StudentDTO studentDTO);
}
