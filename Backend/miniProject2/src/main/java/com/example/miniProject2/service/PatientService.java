package com.example.miniProject2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.miniProject2.model.Patient;
import com.example.miniProject2.repository.PatientRepository;

import jakarta.validation.Valid;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    public Patient registerPatient(@Valid Patient patient) {
        return patientRepository.save(patient);
    }

	
}
