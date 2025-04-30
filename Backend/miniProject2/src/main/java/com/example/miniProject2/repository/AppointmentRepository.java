package com.example.miniProject2.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.miniProject2.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
}
