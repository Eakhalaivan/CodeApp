package com.leetcode.clone.problem.controller;

import com.leetcode.clone.problem.entity.Material;
import com.leetcode.clone.problem.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/materials")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping
    public List<Material> getAllMaterials() {
        return materialService.getAllMaterials();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> getMaterialById(@PathVariable(name = "id") Long id) {
        return materialService.getMaterialById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok().build());
    }

    @PostMapping
    public Material createMaterial(@RequestBody Material material) {
        return materialService.saveMaterial(material);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMaterial(@PathVariable(name = "id") Long id) {
        materialService.deleteMaterial(id);
        return ResponseEntity.noContent().build();
    }
}
