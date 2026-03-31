package com.leetcode.clone.submission.repository;

import com.leetcode.clone.submission.entity.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByUserIdAndProblemIdOrderByCreatedAtDesc(Long userId, Long problemId);
    long countByUserIdAndProblemId(Long userId, Long problemId);
    List<Submission> findByUserIdAndProblemIdOrderByCreatedAtAsc(Long userId, Long problemId);
}
