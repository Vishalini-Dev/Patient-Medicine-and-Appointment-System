package com.example.miniProject2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.miniProject2.model.Medication;
import com.example.miniProject2.service.MedicationService;

@RestController
@RequestMapping("/api/medications")
@CrossOrigin(origins="http://localhost:5500")
public class MedicationController {

    @Autowired
    private MedicationService medicationService;
    @GetMapping
    public ResponseEntity<?> getAllMedications() {
        List<Medication> medications = medicationService.getAllMedications();
        
        if (medications.isEmpty()) {
            return ResponseEntity.ok().body("There are no records. Add some medicine.");
        }
        
        return ResponseEntity.ok(medications);
    }


    @PostMapping("/add")
    public Medication addMedication(@RequestBody Medication medication) {
        return medicationService.addMedication(medication);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<?> editMedication(@PathVariable Long id, @RequestBody Medication newMed) {
        try {
            Medication updatedMed = medicationService.editMedication(id, newMed);
            return ResponseEntity.ok(updatedMed);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public void deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
    }

    @GetMapping("/{id}")
    public Medication getMedication(@PathVariable Long id) {
        return medicationService.getMedication(id)
                .orElseThrow(() -> new RuntimeException("Medication not found"));
    }
}
