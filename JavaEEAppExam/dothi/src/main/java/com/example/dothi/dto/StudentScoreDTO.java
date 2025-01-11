package com.example.dothi.dto;

import com.example.dothi.entity.Student;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentScoreDTO {
    private Integer studentId;
    private Integer subjectId;
    private Double score1;
    private Double score2;
}
