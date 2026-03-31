package com.leetcode.clone.problem.controller;

import com.leetcode.clone.problem.entity.Problem;
import com.leetcode.clone.problem.entity.TestCase;
import com.leetcode.clone.problem.service.ProblemService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/problems")
public class ProblemController {
    private final ProblemService problemService;

    public ProblemController(ProblemService problemService) {
        this.problemService = problemService;
    }

    @GetMapping
    public ResponseEntity<Page<Problem>> getAllProblems(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "sortBy", defaultValue = "id") String sortBy,
            @RequestParam(name = "sortDir", defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return ResponseEntity.ok(problemService.getAllProblems(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemDetails(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(problemService.getProblemById(id));
    }

    @GetMapping("/{id}/test-cases")
    public ResponseEntity<List<TestCase>> getTestCases(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(problemService.getTestCasesByProblemId(id));
    }

    @PostMapping
    public ResponseEntity<Problem> createProblem(@RequestBody Problem problem) {
        return ResponseEntity.ok(problemService.createProblem(problem));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable(name = "id") Long id, @RequestBody Problem problem) {
        return ResponseEntity.ok(problemService.updateProblem(id, problem));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable(name = "id") Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/test-cases")
    public ResponseEntity<TestCase> addTestCase(@PathVariable(name = "id") Long id, @RequestBody TestCase testCase) {
        testCase.setProblemId(id);
        return ResponseEntity.ok(problemService.addTestCase(testCase));
    }
}
