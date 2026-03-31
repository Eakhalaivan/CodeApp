package com.leetcode.clone.execution.dto;

public class ExecutionResult {
    private String status;
    private String output;
    private Double runtime;
    private Double memory;

    public ExecutionResult(String status, String output) {
        this.status = status;
        this.output = output;
    }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getOutput() { return output; }
    public void setOutput(String output) { this.output = output; }
    public Double getRuntime() { return runtime; }
    public void setRuntime(Double runtime) { this.runtime = runtime; }
    public Double getMemory() { return memory; }
    public void setMemory(Double memory) { this.memory = memory; }
}
