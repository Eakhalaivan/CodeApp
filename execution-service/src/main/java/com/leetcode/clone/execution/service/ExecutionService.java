package com.leetcode.clone.execution.service;

import com.leetcode.clone.execution.dto.ExecutionResult;
import com.leetcode.clone.execution.runner.CodeRunner;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/execution")
@Service
public class ExecutionService {
    private final CodeRunner codeRunner;

    public ExecutionService(CodeRunner codeRunner) {
        this.codeRunner = codeRunner;
    }

    @PostMapping
    @SuppressWarnings("unchecked")
    public Map<String, Object> execute(@RequestBody Map<String, Object> submission) {
        String code = (String) submission.get("code");
        String language = (String) submission.get("language");
        List<String> inputs = (List<String>) submission.get("inputs");
        
        if (inputs == null || inputs.isEmpty()) {
            inputs = List.of("Mock Input 1"); // Fallback for old clients
        }

        List<Map<String, Object>> caseResults = new java.util.ArrayList<>();
        boolean allPassed = true;

        for (String input : inputs) {
            ExecutionResult res = codeRunner.run(code, language, input);
            boolean p = res.getStatus().equals("ACCEPTED");
            if (!p) allPassed = false;
            
            caseResults.add(Map.of(
                "input", input,
                "status", res.getStatus(),
                "actualOutput", res.getOutput(),
                "passed", p
            ));
        }
        
        return Map.of(
            "status", allPassed ? "ACCEPTED" : "WRONG_ANSWER",
            "results", caseResults,
            "runtimeMs", 42,
            "memoryKb", 1024
        );
    }
}
