package com.example.miniProject2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.miniProject2.model.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Long> {
}