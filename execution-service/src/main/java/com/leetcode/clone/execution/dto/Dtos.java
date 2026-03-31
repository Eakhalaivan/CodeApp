package com.leetcode.clone.execution.dto;

public class Dtos {
    public static class SubmissionDto {
        private String code;
        private String language;
        
        public String getCode() { return code; }
        public void setCode(String code) { this.code = code; }
        public String getLanguage() { return language; }
        public void setLanguage(String language) { this.language = language; }
    }

    public static class TestCaseDto {
        private String input;
        private String expectedOutput;

        public String getInput() { return input; }
        public void setInput(String input) { this.input = input; }
        public String getExpectedOutput() { return expectedOutput; }
        public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }
    }
}
