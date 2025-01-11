package com.example.dothi.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectResponseDTO {
    private Integer subjectId;
    private String subjectCode;
    private String subjectName;
    private Integer credit;
}
