package com.example.dothi.dto.response;

import com.example.dothi.entity.Subject;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentScoreResponseDTO {
    private Integer studentScoreId;
    private Double score1;
    private Double score2;
    private String grade;
    private SubjectResponseDTO subject;
}
