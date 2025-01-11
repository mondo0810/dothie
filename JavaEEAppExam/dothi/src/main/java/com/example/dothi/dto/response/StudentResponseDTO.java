package com.example.dothi.dto.response;


import com.example.dothi.entity.StudentScore;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentResponseDTO {
    private Integer studentId;
    private String studentCode;
    private String fullName;
    private String address;
    private List<StudentScoreResponseDTO> studentScores;
}
