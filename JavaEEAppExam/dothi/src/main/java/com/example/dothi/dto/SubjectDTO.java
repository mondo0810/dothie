package com.example.dothi.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SubjectDTO {
    private String subjectCode;
    private String subjectName;
    private Integer credit;
}
