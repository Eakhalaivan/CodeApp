package com.leetcode.clone.submission.service;

import com.leetcode.clone.submission.entity.Submission;
import com.leetcode.clone.submission.repository.SubmissionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@Transactional
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final String EXECUTION_SERVICE_URL = "http://localhost:8084/api/execution";

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission submit(Submission submission) {
        // Enforce limit of 20 submissions per user per problem
        long count = submissionRepository.countByUserIdAndProblemId(submission.getUserId(), submission.getProblemId());
        if (count >= 20) {
            List<Submission> oldest = submissionRepository.findByUserIdAndProblemIdOrderByCreatedAtAsc(submission.getUserId(), submission.getProblemId());
            // Delete oldest to make room (if exactly 20, delete 1. If more, delete all above 19)
            int toDelete = (int) (count - 19);
            if (toDelete > 0) {
                submissionRepository.deleteAll(oldest.subList(0, toDelete));
            }
        }

        submission.setStatus(Submission.Status.PENDING);
        Submission saved = submissionRepository.save(submission);

        // Direct call to execution service for demo
        try {
            Submission result = restTemplate.postForObject(EXECUTION_SERVICE_URL, saved, Submission.class);
            if (result != null) {
                saved.setStatus(result.getStatus());
                saved.setRuntimeMs(result.getRuntimeMs());
                saved.setMemoryKb(result.getMemoryKb());
                saved.setActualOutput(result.getActualOutput());
                return submissionRepository.save(saved);
            }
        } catch (Exception e) {
            saved.setStatus(Submission.Status.ERROR);
            submissionRepository.save(saved);
        }

        return saved;
    }

    public List<Submission> getRecentSubmissions(Long userId, Long problemId) {
        return submissionRepository.findByUserIdAndProblemIdOrderByCreatedAtDesc(userId, problemId);
    }

    public Submission getSubmissionById(Long id) {
        return submissionRepository.findById(id).orElseThrow();
    }
}
