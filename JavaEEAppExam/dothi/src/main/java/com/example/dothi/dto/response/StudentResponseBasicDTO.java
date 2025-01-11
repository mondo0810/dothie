package com.example.dothi.dto.response;


import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class StudentResponseBasicDTO {
    private Integer studentId;
    private String fullName;
}
