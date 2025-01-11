package com.example.dothi.utils;

public class GradeUtil {

    // Hàm tính điểm trung bình (Grade) từ score1 và score2
    public static String convertScoreToGrade(double score1, double score2) {
        // Tính điểm trung bình weighted (0.3 * score1 + 0.7 * score2)
        double grade = (0.3 * score1) + (0.7 * score2);

        // Phân loại Grade theo bảng
        if (grade >= 8.0) {
            return "A";
        } else if (grade >= 6.0) {
            return "B";
        } else if (grade >= 4.0) {
            return "D";
        } else {
            return "F";
        }
    }
}
