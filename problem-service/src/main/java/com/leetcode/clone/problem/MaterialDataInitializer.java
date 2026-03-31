package com.leetcode.clone.problem;

import com.leetcode.clone.problem.entity.Material;
import com.leetcode.clone.problem.repository.MaterialRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MaterialDataInitializer implements CommandLineRunner {

    private final MaterialRepository materialRepository;
    private final com.fasterxml.jackson.databind.ObjectMapper objectMapper;

    public MaterialDataInitializer(MaterialRepository materialRepository, com.fasterxml.jackson.databind.ObjectMapper objectMapper) {
        this.materialRepository = materialRepository;
        this.objectMapper = objectMapper;
    }

    @Override
    public void run(String... args) {
        // Clear old materials to ensure we load the clean schema
        materialRepository.deleteAll();
        
        try (java.io.InputStream inputStream = new org.springframework.core.io.ClassPathResource("materials.json").getInputStream()) {
            List<Material> materials = objectMapper.readValue(inputStream, new com.fasterxml.jackson.core.type.TypeReference<List<Material>>(){});
            materialRepository.saveAll(materials);
            System.out.println("📚 Study Materials successfully seeded from materials.json without hardcoding!");
        } catch (Exception e) {
            System.err.println("❌ Failed to seed materials from JSON: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
