package com.leetcode.clone.submission.controller;

import com.leetcode.clone.submission.entity.Submission;
import com.leetcode.clone.submission.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
public class SubmissionController {
    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public ResponseEntity<Submission> submitCode(@RequestBody Submission submission) {
        return ResponseEntity.ok(submissionService.submit(submission));
    }

    @GetMapping("/{userId}/{problemId}")
    public ResponseEntity<List<Submission>> getRecentSubmissions(
            @PathVariable Long userId,
            @PathVariable Long problemId) {
        return ResponseEntity.ok(submissionService.getRecentSubmissions(userId, problemId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Submission> getSubmissionById(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmissionById(id));
    }
}
