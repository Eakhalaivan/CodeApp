package com.leetcode.clone.problem.service;

import com.leetcode.clone.problem.entity.Problem;
import com.leetcode.clone.problem.entity.TestCase;
import com.leetcode.clone.problem.repository.ProblemRepository;
import com.leetcode.clone.problem.repository.TestCaseRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProblemService {
    private final ProblemRepository problemRepository;
    private final TestCaseRepository testCaseRepository;

    public ProblemService(ProblemRepository problemRepository, TestCaseRepository testCaseRepository) {
        this.problemRepository = problemRepository;
        this.testCaseRepository = testCaseRepository;
    }

    public Page<Problem> getAllProblems(Pageable pageable) {
        return problemRepository.findAll(pageable);
    }

    public Problem getProblemById(Long id) {
        return problemRepository.findById(id).orElseThrow();
    }

    public Problem createProblem(Problem problem) {
        return problemRepository.save(problem);
    }

    public Problem updateProblem(Long id, Problem problemDetails) {
        Problem problem = getProblemById(id);
        problem.setTitle(problemDetails.getTitle());
        problem.setDescription(problemDetails.getDescription());
        problem.setDifficulty(problemDetails.getDifficulty());
        problem.setConstraints(problemDetails.getConstraints());
        problem.setCompanies(problemDetails.getCompanies());
        problem.setLanguage(problemDetails.getLanguage());
        problem.setDefaultCode(problemDetails.getDefaultCode());
        problem.setTags(problemDetails.getTags());
        return problemRepository.save(problem);
    }

    public void deleteProblem(Long id) {
        problemRepository.deleteById(id);
    }

    public TestCase addTestCase(TestCase testCase) {
        return testCaseRepository.save(testCase);
    }

    public List<TestCase> getTestCasesByProblemId(Long problemId) {
        return testCaseRepository.findByProblemId(problemId);
    }
}
