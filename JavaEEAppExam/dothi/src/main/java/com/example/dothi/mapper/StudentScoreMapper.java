package com.example.dothi.mapper;


import com.example.dothi.dto.StudentScoreDTO;
import com.example.dothi.entity.StudentScore;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface StudentScoreMapper {


    // Entity to DTO
    @Mapping(source = "student.studentId", target = "studentId")
    @Mapping(source = "subject.subjectId", target = "subjectId")
    StudentScoreDTO toDTO(StudentScore studentScore);

    // DTO to Entity
    @Mapping(source = "studentId", target = "student.studentId")
    @Mapping(source = "subjectId", target = "subject.subjectId")
    StudentScore toEntity(StudentScoreDTO studentScoreDTO);
}
