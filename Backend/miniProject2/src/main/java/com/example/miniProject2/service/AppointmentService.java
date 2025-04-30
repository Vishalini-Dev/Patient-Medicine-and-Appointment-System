package com.example.miniProject2.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.miniProject2.model.Appointment;
import com.example.miniProject2.model.Doctor;
import com.example.miniProject2.repository.AppointmentRepository;
import com.example.miniProject2.repository.DoctorRepository;


@Service
public class AppointmentService {
    
    @Autowired
    private DoctorRepository doctorRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Appointment bookAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}