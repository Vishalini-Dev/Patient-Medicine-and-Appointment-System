package com.example.miniProject2;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.miniProject2.model.Patient;
import com.example.miniProject2.service.PatientService;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class MedicalManagementSystemApplicationTests {

    @Autowired
    private PatientService patientService;

    @Test
    public void testPatientRegistration() {
        Patient patient = new Patient();
        patient.setName("John Doe");
        patient.setContact("1234567890");
        patient.setMedicalHistory("None");

        Patient savedPatient = patientService.registerPatient(patient);
        assertNotNull(savedPatient.getId());
    }
}
