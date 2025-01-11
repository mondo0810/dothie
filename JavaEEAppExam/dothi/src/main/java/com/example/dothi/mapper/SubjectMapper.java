package com.example.dothi.mapper;

import com.example.dothi.dto.SubjectDTO;
import com.example.dothi.dto.response.SubjectResponseDTO;
import com.example.dothi.entity.Subject;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SubjectMapper {

    // Entity to DTO
    SubjectDTO toDTO(Subject subject);

    SubjectResponseDTO toResponseDTO(Subject subject);

    // DTO to Entity
    Subject toEntity(SubjectDTO subjectDTO);
}

