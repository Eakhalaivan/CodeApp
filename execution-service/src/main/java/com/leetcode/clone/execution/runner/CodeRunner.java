package com.leetcode.clone.execution.runner;

import com.leetcode.clone.execution.dto.ExecutionResult;
import org.springframework.stereotype.Component;

@Component
public class CodeRunner {
    public ExecutionResult run(String code, String language, String input) {
        // Basic check for meaningful modification
        String trimmedCode = code.replaceAll("\\s+", "");
        boolean isUnmodified = trimmedCode.contains("//YourJavacodehere") || 
                              trimmedCode.contains("//YourJavaScriptcodehere") ||
                              trimmedCode.contains("//YourTypeScriptcodehere") ||
                              trimmedCode.contains("#YourPythoncodehere") ||
                              trimmedCode.contains("//YourC++codehere");
        
        boolean hasLogic = code.contains("return") || code.contains("console.log") || code.contains("System.out");
        
        // Simulation: if code is very short (e.g. return 0;), it fails on Case 2 and 3
        boolean caseSpecificPass = true;
        if (code.length() < 50 && (input.contains("3") || input.contains("6"))) {
            caseSpecificPass = false;
        }

        boolean isAccepted = hasLogic && !isUnmodified && caseSpecificPass;
        
        ExecutionResult result = new ExecutionResult(
            isAccepted ? "ACCEPTED" : "WRONG_ANSWER",
            isAccepted ? "Mock Output: [0, 1]" : "Error: Logic failed for input: " + input
        );
        result.setRuntime(42.0);
        result.setMemory(1024.0);
        
        return result;
    }
}
