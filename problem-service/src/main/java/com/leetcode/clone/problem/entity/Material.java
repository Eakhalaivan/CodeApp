package com.leetcode.clone.problem.entity;

import jakarta.persistence.*;

@Entity
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(length = 2000)
    private String shortDescription;
    
    private String category;
    private String language;
    private String imageUrl;
    private String difficulty;
    private String readTime;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private java.util.List<String> tags;
    
    @Column(columnDefinition = "TEXT")
    private String introduction;
    
    @Column(columnDefinition = "TEXT")
    private String coreConcepts;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private java.util.List<String> keyTopics;
    
    @Column(columnDefinition = "TEXT")
    private String deepExplanation;
    
    @Column(columnDefinition = "TEXT")
    private String codeExample;
    
    @Column(columnDefinition = "TEXT")
    private String realWorldUse;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private java.util.List<String> keyTakeaways;
    
    @ElementCollection(fetch = FetchType.EAGER)
    private java.util.List<String> practiceQuestions;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getReadTime() { return readTime; }
    public void setReadTime(String readTime) { this.readTime = readTime; }
    public Integer getRoadmapLevel() { return roadmapLevel; }
    public void setRoadmapLevel(Integer roadmapLevel) { this.roadmapLevel = roadmapLevel; }
    public java.util.List<String> getTags() { return tags; }
    public void setTags(java.util.List<String> tags) { this.tags = tags; }
    public String getIntroduction() { return introduction; }
    public void setIntroduction(String introduction) { this.introduction = introduction; }
    public String getCoreConcepts() { return coreConcepts; }
    public void setCoreConcepts(String coreConcepts) { this.coreConcepts = coreConcepts; }
    public java.util.List<String> getKeyTopics() { return keyTopics; }
    public void setKeyTopics(java.util.List<String> keyTopics) { this.keyTopics = keyTopics; }
    public String getDeepExplanation() { return deepExplanation; }
    public void setDeepExplanation(String deepExplanation) { this.deepExplanation = deepExplanation; }
    public String getCodeExample() { return codeExample; }
    public void setCodeExample(String codeExample) { this.codeExample = codeExample; }
    public String getRealWorldUse() { return realWorldUse; }
    public void setRealWorldUse(String realWorldUse) { this.realWorldUse = realWorldUse; }
    public java.util.List<String> getKeyTakeaways() { return keyTakeaways; }
    public void setKeyTakeaways(java.util.List<String> keyTakeaways) { this.keyTakeaways = keyTakeaways; }
    public java.util.List<String> getPracticeQuestions() { return practiceQuestions; }
    public void setPracticeQuestions(java.util.List<String> practiceQuestions) { this.practiceQuestions = practiceQuestions; }
}
