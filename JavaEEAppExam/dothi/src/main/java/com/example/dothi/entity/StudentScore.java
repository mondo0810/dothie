package com.example.dothi.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_score_t")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_score_id")
    private Integer studentScoreId;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", referencedColumnName = "subject_id", nullable = false)
    private Subject subject;

    @Column(name = "score1")
    private Double score1;

    @Column(name = "score2")
    private Double score2;
}
