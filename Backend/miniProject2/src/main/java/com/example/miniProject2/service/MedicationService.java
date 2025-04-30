package com.example.miniProject2.service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.miniProject2.model.Medication;
import com.example.miniProject2.repository.MedicationRepository;

@Service
public class MedicationService {

    @Autowired
    private MedicationRepository medicationRepo;
    public List<Medication> getAllMedications() {
        return medicationRepo.findAll();
    }

    public Medication addMedication(Medication medication) {
        return medicationRepo.save(medication);
    }

    public Medication editMedication(Long id, Medication newMed) {
        Medication med = medicationRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Medication not found with ID: " + id));

        med.setMedicationName(newMed.getMedicationName());
        med.setDosage(newMed.getDosage());
        med.setFrequency(newMed.getFrequency());

        if (newMed.getPatient() != null) {
            med.setPatient(newMed.getPatient());
        }
        
        return medicationRepo.save(med);
    }

    public void deleteMedication(Long id) {
        medicationRepo.deleteById(id);
    }

    public Optional<Medication> getMedication(Long id) {
        return medicationRepo.findById(id);
    }
}
