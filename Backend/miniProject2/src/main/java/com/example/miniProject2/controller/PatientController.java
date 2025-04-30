package com.example.miniProject2.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.miniProject2.model.Patient;
import com.example.miniProject2.repository.PatientRepository;
import com.example.miniProject2.service.PatientService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "http://localhost:5500")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public Patient registerPatient(@Valid @RequestBody Patient patient) {
        return patientService.registerPatient(patient);
    }
}


